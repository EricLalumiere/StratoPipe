import os
import re
import ast
from pathlib import Path


def get_node_value(node):
    """Recursively get a value from an AST node."""
    if isinstance(node, ast.Constant):
        return node.value
    if isinstance(node, ast.Str):  # For older Python versions
        return node.s
    if isinstance(node, ast.Name):
        return node.id
    if isinstance(node, ast.Attribute):
        return f"{get_node_value(node.value)}.{node.attr}"
    if isinstance(node, (ast.List, ast.Tuple)):
        return [get_node_value(e) for e in node.elts]
    return "Complex Value"


def analyze_django_app(app_path):
    """Analyzes a single Django app using AST for deep insights."""
    report = []

    # --- Models ---
    models_file = app_path / 'models.py'
    if models_file.exists():
        report.append(f"\n#### Models (`{app_path.name}/models.py`)")
        try:
            tree = ast.parse(models_file.read_text())
            for node in ast.walk(tree):
                if isinstance(node, ast.ClassDef) and 'models.Model' in [get_node_value(b) for b in node.bases]:
                    report.append(f"\n- **Model: `{node.name}`**")
                    fields = []
                    for item in node.body:
                        if isinstance(item, ast.Assign):
                            field_name = item.targets[0].id
                            if isinstance(item.value, ast.Call) and 'models.' in get_node_value(item.value.func):
                                field_type = get_node_value(item.value.func)
                                fields.append(f"  - `{field_name}` ({field_type})")
                    if fields:
                        report.extend(fields)
                    else:
                        report.append("  - No model fields found.")
        except Exception as e:
            report.append(f"  - Error parsing models.py: {e}")

    # --- Views ---
    views_file = app_path / 'views.py'
    if views_file.exists():
        report.append(f"\n#### Views (`{app_path.name}/views.py`)")
        try:
            tree = ast.parse(views_file.read_text())
            for node in ast.walk(tree):
                if isinstance(node, ast.ClassDef):
                    report.append(f"\n- **View: `{node.name}`** (Class-Based)")
                    details = []
                    for item in node.body:
                        if isinstance(item, ast.Assign) and len(item.targets) == 1:
                            attr_name = item.targets[0].id
                            if attr_name in ['serializer_class', 'permission_classes', 'queryset']:
                                details.append(f"  - `{attr_name}`: {get_node_value(item.value)}")
                    if details:
                        report.extend(details)
                elif isinstance(node, ast.FunctionDef) and 'request' in [arg.arg for arg in node.args.args]:
                    report.append(f"\n- **View: `{node.name}`** (Function-Based)")

        except Exception as e:
            report.append(f"  - Error parsing views.py: {e}")

    # --- Serializers ---
    serializers_file = app_path / 'serializers.py'
    if serializers_file.exists():
        report.append(f"\n#### Serializers (`{app_path.name}/serializers.py`)")
        try:
            tree = ast.parse(serializers_file.read_text())
            for node in ast.walk(tree):
                if isinstance(node, ast.ClassDef) and 'Serializer' in node.name:
                    report.append(f"\n- **Serializer: `{node.name}`**")
                    for sub_node in node.body:
                        if isinstance(sub_node, ast.ClassDef) and sub_node.name == 'Meta':
                            for meta_item in sub_node.body:
                                if isinstance(meta_item, ast.Assign) and len(meta_item.targets) == 1:
                                    meta_attr = meta_item.targets[0].id
                                    if meta_attr in ['model', 'fields', 'read_only_fields']:
                                        report.append(f"  - `Meta.{meta_attr}`: {get_node_value(meta_item.value)}")
        except Exception as e:
            report.append(f"  - Error parsing serializers.py: {e}")

    # --- URLs ---
    urls_file = app_path / 'urls.py'
    if urls_file.exists():
        report.append(f"\n#### URL Patterns (`{app_path.name}/urls.py`)")
        content = urls_file.read_text()
        urls = re.findall(r"path\(['\"]([^'\"]+)['\"],\s*([^,]+),", content)
        if urls:
            for url, view in urls:
                report.append(f"- `/{url}` -> `{view.strip()}`")
        else:
            report.append("- No URL patterns found.")

    # --- Celery Tasks ---
    tasks_file = app_path / 'tasks.py'
    if tasks_file.exists():
        report.append(f"\n#### Asynchronous Tasks (`{app_path.name}/tasks.py`)")
        content = tasks_file.read_text()
        tasks = re.findall(r"@shared_task\s*\ndef\s+(\w+)\(.*\):", content)
        if tasks:
            for task in tasks:
                report.append(f"- **Task:** `{task}`")
        else:
            report.append("- No Celery tasks found.")

    return "\n".join(report)


def analyze_react_project(frontend_path):
    """Analyzes a React project for components and API calls."""
    report = []
    src_path = frontend_path / 'src'
    if not src_path.is_dir():
        return ""

    report.append(f"\n## Frontend Functionalities (React)")
    report.append(f"Source Directory: `{src_path}`")

    for root, _, files in os.walk(src_path):
        for file in files:
            if file.endswith(('.js', '.jsx')):
                comp_path = Path(root) / file
                relative_path = comp_path.relative_to(frontend_path)
                report.append(f"\n### Component File: `{relative_path}`")
                try:
                    content = comp_path.read_text(errors='ignore')

                    # API Calls
                    api_calls = re.findall(r"(?:axios|fetch)[\.\(]['\"]([^'\"]+)['\"]", content)
                    if api_calls:
                        report.append("- **API Calls:**")
                        for call in set(api_calls):
                            report.append(f"  - `{call}`")

                    # WebSocket
                    ws_calls = re.findall(r"new WebSocket\(['\"]([^'\"]+)['\"]", content)
                    if ws_calls:
                        report.append("- **WebSocket Connections:**")
                        for call in set(ws_calls):
                            report.append(f"  - `{call}`")

                except Exception as e:
                    report.append(f"  - Error parsing component: {e}")
    return "\n".join(report)


def generate_detailed_report(repo_path):
    """
    Analyzes a code repository and generates a highly detailed report.
    """
    report_lines = ["# Code Repository: Detailed Analysis Report"]
    repo_path = Path(repo_path)

    if not repo_path.is_dir():
        return "Error: Invalid repository path."

    # --- Project Overview ---
    report_lines.append("\n## Project Overview")
    report_lines.append(f"- **Project Name:** {repo_path.name}")

    is_django = (repo_path / 'manage.py').exists()
    is_react = (repo_path / 'frontend' / 'package.json').exists() or (repo_path / 'package.json').exists()

    technologies = []
    if is_django: technologies.append("Django")
    if is_react: technologies.append("React")
    report_lines.append(f"- **Detected Technologies:** {', '.join(technologies)}")

    # --- Backend Analysis (Django) ---
    if is_django:
        report_lines.append("\n## Backend Analysis (Django)")
        django_apps = [d for d in repo_path.iterdir() if (d / 'apps.py').exists() and d.is_dir()]
        if django_apps:
            report_lines.append(f"- **Detected Django Apps:** {', '.join([d.name for d in django_apps])}")
            for app_path in django_apps:
                report_lines.append(f"\n### App: `{app_path.name}`")
                report_lines.append(analyze_django_app(app_path))
        else:
            report_lines.append("- No Django apps detected.")

    # --- Frontend Analysis (React) ---
    if is_react:
        frontend_path = repo_path / 'frontend' if (repo_path / 'frontend').exists() else repo_path
        report_lines.append(analyze_react_project(frontend_path))

    return "\n".join(report_lines)


if __name__ == '__main__':
    # --- How to Use ---
    # 1. IMPORTANT: Replace 'path/to/your/StratoPipe' with the actual path to your project's root directory.
    # 2. Run the script from your terminal: python your_script_name.py
    # 3. The report will be printed to the console. It is highly recommended to save it to a file:
    #    python your_script_name.py > detailed_report.md

    repo_directory = "/Users/eric/pythonProject/StratoPipe"  # <-- VERY IMPORTANT: CHANGE THIS PATH

    if repo_directory == "path/to/your/StratoPipe":
        print("=" * 60)
        print("!!! PLEASE UPDATE THE 'repo_directory' VARIABLE !!!")
        print("=" * 60)
        print("Replace 'path/to/your/StratoPipe' with the actual file path")
        print("to your project's root directory before running this script.")
        print("-" * 60)
    else:
        detailed_report = generate_detailed_report(repo_directory)
        print(detailed_report)
