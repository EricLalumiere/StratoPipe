""" A module that provides utility functions to parse a directory structure"""
import os
import json
import ast
import re
import xml.etree.ElementTree as ET
from fpdf import FPDF

# Directories to ignore (full paths)
ignore_dirs = [
    "/Users/eric/pythonProject/StratoPipe/.idea",
    "/Users/eric/pythonProject/StratoPipe/.venv",
    "/Users/eric/pythonProject/StratoPipe/venv",
    "/Users/eric/pythonProject/StratoPipe/node_modules",
    "/Users/eric/pythonProject/StratoPipe/frontend/node_modules",
    "/Users/eric/pythonProject/StratoPipe/renders",
    "/Users/eric/pythonProject/StratoPipe/thumbnails"
]
DIRECTORY_TO_PARSE = "/Users/eric/pythonProject/StratoPipe"

class PDFReport(FPDF):
    """
    A class that represents a PDF report generator for project implementation
    reports, built upon the FPDF library.

    This class provides the functionality to create a structured PDF document
    with a predefined header and footer, allowing users to add section titles
    and text content. It simplifies the creation of PDF reports by enforcing
    consistent styling and layout.

    :ivar epw: Effective page width calculated from current page width and
        left/right margins.
    :type epw: float
    :ivar current_orientation: Orientation of the current page; it could be
        either 'P' for portrait or 'L' for landscape.
    :type current_orientation: str
    :ivar l_margin: Left margin currently applied to the document.
    :type l_margin: float
    :ivar r_margin: Right margin currently applied to the document.
    :type r_margin: float
    :ivar t_margin: Top margin currently applied to the document.
    :type t_margin: float
    :ivar b_margin: Bottom margin currently applied to the document.
    :type b_margin: float
    """
    def header(self):
        """ Add a header to the PDF report."""
        self.set_font('Arial', 'B', 12)
        self.cell(0, 7, 'Project Implementation Report', align='C', ln=1)
    def footer(self):
        """ Add a page number to the footer of the PDF report."""
        self.set_y(-10)
        self.set_font('Arial', 'I', 8)
        self.cell(0, 7, f'Page {self.page_no()}', align='C')
    def add_section_title(self, title):
        """ Add a section title to the PDF report."""
        self.set_font('Arial', 'B', 12)
        self.cell(0, 5, title, ln=1)
        self.ln(1)
    def add_text(self, text):
        """ Add a text block to the PDF report."""
        self.set_font('Arial', '', 10)
        self.multi_cell(0, 5, text)
        self.ln(1)

def parse_python_code(file_path: str) -> dict[str, list[str]]:
    """ Parse a Python file and extract functions and classes from it."""
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        tree = ast.parse(content)
        details = {
            "functions": [node.name for node in ast.walk(tree) if isinstance(
                node, ast.FunctionDef)],
            "classes": [node.name for node in ast.walk(tree) if isinstance(
                node, ast.ClassDef)]
        }
        return details
    except SyntaxError:
        return {"error": "Syntax error"}
    except Exception as e:
        return {"error": f"{e}"}

def parse_folder_structure(directory, ignore_dirs=None):
    """ Parse the folder structure of a directory and extract file details."""
    if ignore_dirs is None:
        ignore_dirs = []
    folder_structure = {}
    for root, dirs, files in os.walk(directory):
        dirs[:] = [d for d in dirs if os.path.join(root, d) not in ignore_dirs]
        folder_structure[root] = {"subfolders": dirs, "files": []}
        for file in files:
            file_path = os.path.join(root, file)
            file_ext = os.path.splitext(file)[1].lower()
            file_info = {"name": file, "type": file_ext, "details": None}
            if file_ext == '.py':
                file_info["details"] = parse_python_code(file_path)
            elif file_ext == '.js':
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    # For simplicity, we list lines starting with "function" only.
                    functions = [line.strip() for line in content.splitlines()
                                 if line.strip().startswith("function")]
                    if functions:
                        file_info["details"] = {"functions": functions}
                except Exception as e:
                    file_info["details"] = f"{e}"
            elif file_ext == '.html':
                # We consider HTML as non-code (essential detail omitted).
                file_info["details"] = None
            elif file_ext == '.css':
                file_info["details"] = None
            elif file_ext == '.json':
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        json.load(f)
                    file_info["details"] = "Parsable JSON"
                except Exception:
                    file_info["details"] = "Unparsable JSON"
            elif file_ext == '.xml':
                try:
                    tree = ET.parse(file_path)
                    file_info["details"] = f"XML Root: {tree.getroot().tag}"
                except Exception as e:
                    file_info["details"] = f"{e}"
            elif file_ext == '.md':
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    lines = content.splitlines()
                    headings = [line for line in lines if line.strip().startswith("#")]
                    links = re.findall(r'\[.*?\]\((.*?)\)', content)
                    file_info["details"] = {"headings": len(headings), "links": len(links)}
                except Exception as e:
                    file_info["details"] = f"{e}"
            elif file_ext == '.txt':
                file_info["details"] = None
            folder_structure[root]["files"].append(file_info)
    return folder_structure

def generate_pdf_report(folder_structure, output_file="project_report.pdf"):
    """ Generate a PDF report from the folder structure data."""
    pdf = PDFReport()
    pdf.add_page()
    for folder, content in folder_structure.items():
        pdf.add_section_title(f"Folder: {folder}")
        if content['subfolders']:
            pdf.add_text("Subfolders: " + ", ".join(content['subfolders']))
        pdf.add_text("Files:")
        for file_info in content['files']:
            pdf.add_text(f" - {file_info['name']} (Type: {file_info['type']})")
            if file_info["details"]:
                if isinstance(file_info["details"], dict):
                    details = ""
                    if file_info["type"] == ".py":
                        funcs = file_info["details"].get("functions", [])
                        classes = file_info["details"].get("classes", [])
                        if funcs:
                            details += "Functions: " + ", ".join(funcs)
                        if classes:
                            details += " | Classes: " + ", ".join(classes)
                    elif file_info["type"] == ".md":
                        headings = file_info["details"].get("headings", 0)
                        links = file_info["details"].get("links", 0)
                        details += f"Headings: {headings}, Links: {links}"
                    else:
                        # For other types, include details only if not None.
                        details = str(file_info["details"])
                    if details:
                        pdf.add_text("   " + details)
                else:
                    pdf.add_text("   " + str(file_info["details"]))
        pdf.ln(1)
    pdf.output(output_file)
    print(f"PDF report generated: {output_file}")

if __name__ == "__main__":
    if os.path.exists(DIRECTORY_TO_PARSE):
        folder_structure = parse_folder_structure(DIRECTORY_TO_PARSE, ignore_dirs)
        generate_pdf_report(folder_structure)
    else:
        print("Invalid directory path.")
