import argparse
import subprocess
import json

"""
Start with gh auth login
"""


def run_command(command):
    result = subprocess.run(command, capture_output=True, text=True, check=True)
    return result.stdout


def delete_deployments(owner, repo):
    url = f"/repos/{owner}/{repo}/deployments"

    get_command = f"gh api {url} --paginate"
    deployments = json.loads(run_command(get_command))

    deployments.sort(key=lambda x: x["created_at"], reverse=True)

    ids = [deployment["id"] for deployment in deployments[1:]]

    for id in ids:
        delete_command = f"gh api {url}/{id} --method DELETE"
        run_command(delete_command)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("owner", type=str, help="The name of repository owner")
    parser.add_argument("repo", type=str, help="The name of repository")
    args = parser.parse_args()
    delete_deployments(args.owner, args.repo)
