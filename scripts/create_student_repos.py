"""
DISC College - Student GitHub Repository Provisioning Script

Automates creating private, student-isolated GitHub repositories within the college organisation
and granting push permissions exclusively to each student.

Zero external dependencies - uses standard library urllib.request.
Compatible with Python 3.8+
"""

import os
import json
import urllib.request
import urllib.error

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN", "ghp_yourPersonalAccessTokenHere")
ORG_NAME = "disc-college"  # Your GitHub College Organisation name

# List of student GitHub usernames
STUDENTS = [
    "student_alex",
    "student_maria",
    "student_john"
]

HEADERS = {
    "Authorization": f"Bearer {GITHUB_TOKEN}",
    "Accept": "application/vnd.github+json",
    "User-Agent": "DISC-College-Provisioner/1.0"
}


def send_request(url: str, method: str = "GET", data: dict = None) -> tuple[int, dict | str]:
    body = json.dumps(data).encode("utf-8") if data else None
    req = urllib.request.Request(url, data=body, headers=HEADERS, method=method)
    try:
        with urllib.request.urlopen(req) as response:
            res_body = response.read().decode("utf-8")
            try:
                return response.status, json.loads(res_body) if res_body else {}
            except json.JSONDecodeError:
                return response.status, res_body
    except urllib.error.HTTPError as e:
        err_msg = e.read().decode("utf-8")
        return e.code, err_msg
    except Exception as e:
        return 500, str(e)


def provision_student_repo(username: str):
    repo_name = f"disc-project-{username}"
    print(f"\n--- Provisioning workspace for: {username} ---")

    # Step 1: Create private repository inside the Organisation
    create_url = f"https://api.github.com/orgs/{ORG_NAME}/repos"
    repo_payload = {
        "name": repo_name,
        "private": True,
        "description": f"Personal coursework repository for {username} - DISC College",
        "auto_init": True
    }

    status, response = send_request(create_url, method="POST", data=repo_payload)
    if status == 201:
        print(f"[OK] Created repository: {ORG_NAME}/{repo_name}")
    elif status == 422:
        print(f"[INFO] Repository {repo_name} already exists. Continuing to permissions...")
    else:
        print(f"[ERROR] Failed to create repository ({status}): {response}")
        return

    # Step 2: Grant the student collaborator access with push permissions
    collab_url = f"https://api.github.com/repos/{ORG_NAME}/{repo_name}/collaborators/{username}"
    status, response = send_request(collab_url, method="PUT", data={"permission": "push"})

    if status in (201, 204):
        print(f"[OK] Invitation sent to @{username} with write/push permissions.")
        print(f"[URL] Clone URL: https://github.com/{ORG_NAME}/{repo_name}.git")
    else:
        print(f"[ERROR] Failed to assign permissions to @{username} ({status}): {response}")


def main():
    if GITHUB_TOKEN == "ghp_yourPersonalAccessTokenHere":
        print("WARNING: Please set your valid GitHub Personal Access Token in GITHUB_TOKEN.\n")

    print(f"Starting automated provisioning for {len(STUDENTS)} student(s) in organisation: {ORG_NAME}")
    for student in STUDENTS:
        provision_student_repo(student)
    print("\n[COMPLETE] All student repositories have been processed successfully.")


if __name__ == "__main__":
    main()
