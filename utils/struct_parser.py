import os
import json
import ast
from datetime import datetime
from fpdf import FPDF

ignore_dirs = ["/Users/eric/pythonProject/StratoPipe/.idea",
                "/Users/eric/pythonProject/StratoPipe/.venv",
                "/Users/eric/pythonProject/StratoPipe/venv",
                "/Users/eric/pythonProject/StratoPipe/node_modules",
               "/Users/eric/pythonProject/StratoPipe/frontend/node_modules",
                "/Users/eric/pythonProject/StratoPipe/renders",
                "/Users/eric/pythonProject/StratoPipe/thumbnails"]

directory_to_parse = "/Users/eric/pythonProject/StratoPipe"

class PDFReport(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 12)
        self.cell(0, 10, 'Project Implementation Report', align='C', ln=1)

    def footer(self):
        self.set_y(-15)
        self.set_font('Arial', 'I', 8)
        self.cell(0, 10, f'Page {self.page_no()}', align='C')

    def add_section_title(self, title):
        self.set_font('Arial', 'B', 12)
        self.cell(0, 10, title, ln=1)
        self.ln(5)

    def add_text(self, text):
        self.set_font('Arial', '', 10)
        self.multi_cell(0, 10, text)
        self.ln(5)


def parse_python_code(file_path):
    """Parses a Python file and extracts details like functions, classes, and docstrings."""
    with open(file_path, 'r') as file:
        content = file.read()
    try:
        tree = ast.parse(content)
        details = {
            "functions": [node.name for node in ast.walk(tree) if isinstance(node, ast.FunctionDef)],
            "classes": [node.name for node in ast.walk(tree) if isinstance(node, ast.ClassDef)],
            "docstrings": ast.get_docstring(tree)
        }
        return details
    except SyntaxError:
        return {"error": "Could not parse Python code due to syntax error."}


def parse_folder_structure(directory, ignore_dirs=None):
    if ignore_dirs is None:
        ignore_dirs = []

    folder_structure = {}

    for root, dirs, files in os.walk(directory):
        # Exclude ignored directories
        dirs[:] = [d for d in dirs if os.path.join(root, d) not in ignore_dirs]

        folder_structure[root] = {
            "subfolders": dirs,
            "files": [
                {
                    "name": file,
                    "size": os.path.getsize(os.path.join(root, file)),
                    "type": os.path.splitext(file)[1],
                    "modified_time": datetime.fromtimestamp(
                        os.path.getmtime(os.path.join(root, file))
                    ).strftime('%Y-%m-%d %H:%M:%S'),
                    "python_details": parse_python_code(os.path.join(root, file)) if file.endswith('.py') else None
                }
                for file in files
            ]
        }

    return folder_structure


def generate_pdf_report(folder_structure, output_file="project_report.pdf"):
    pdf = PDFReport()
    pdf.add_page()

    for folder, content in folder_structure.items():
        pdf.add_section_title(f"Folder: {folder}")
        pdf.add_text("Subfolders:")
        for subfolder in content['subfolders']:
            pdf.add_text(f"  - {subfolder}")

        pdf.add_text("Files:")
        for file_info in content['files']:
            file_text = (f"  - {file_info['name']} (Size: {file_info['size']} bytes, Type: {file_info['type']}, "
                         f"Last Modified: {file_info['modified_time']})")
            pdf.add_text(file_text)

            if file_info["python_details"]:
                pdf.add_text("    Python Details:")
                python_details = file_info["python_details"]
                if "error" in python_details:
                    pdf.add_text(f"      Error: {python_details['error']}")
                else:
                    pdf.add_text(f"      Functions: {', '.join(python_details['functions']) or 'None'}")
                    pdf.add_text(f"      Classes: {', '.join(python_details['classes']) or 'None'}")
                    pdf.add_text(f"      Docstring: {python_details['docstrings'] or 'None'}")

        pdf.ln(5)

    pdf.output(output_file)
    print(f"PDF report generated: {output_file}")


if __name__ == "__main__":
    # directory_to_parse = input("Enter the path of the directory to parse: ")
    # ignore_dirs_input = input("Enter directories to ignore (comma-separated, full paths): ").split(",")
    # ignore_dirs = [d.strip() for d in ignore_dirs_input if d.strip()]

    if os.path.exists(directory_to_parse):
        folder_structure = parse_folder_structure(directory_to_parse, ignore_dirs)
        generate_pdf_report(folder_structure)
    else:
        print("Invalid directory path.")
