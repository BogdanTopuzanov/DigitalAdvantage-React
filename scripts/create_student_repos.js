/**
 * DISC College - Student GitHub Repository Provisioning Script
 * 
 * Automates the creation of isolated, private GitHub repositories for each student
 * within the college organisation and grants push permissions exclusively to them.
 * 
 * Requirements: Node.js 18+ (uses native fetch, zero dependencies)
 * Usage:
 *   1. Set GITHUB_TOKEN and ORG_NAME below
 *   2. Populate the STUDENTS list with GitHub usernames
 *   3. Run: node scripts/create_student_repos.js
 */

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "ghp_yourPersonalAccessTokenHere";
const ORG_NAME = "disc-college"; // Your GitHub College Organisation name

// List of student GitHub usernames
const STUDENTS = [
  "student_alex",
  "student_maria",
  "student_john"
];

const HEADERS = {
  "Authorization": `Bearer ${GITHUB_TOKEN}`,
  "Accept": "application/vnd.github+json",
  "User-Agent": "DISC-College-Provisioner/1.0"
};

async function provisionStudentRepo(username) {
  const repoName = `disc-project-${username}`;
  console.log(`\n--- Provisioning workspace for: ${username} ---`);

  // Step 1: Create private repository inside the Organisation
  const createUrl = `https://api.github.com/orgs/${ORG_NAME}/repos`;
  const repoPayload = {
    name: repoName,
    private: true,
    description: `Personal coursework repository for ${username} - DISC College`,
    auto_init: true // Automatically initialises main branch and README.md
  };

  try {
    const createRes = await fetch(createUrl, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(repoPayload)
    });

    if (createRes.status === 201) {
      console.log(`[OK] Created repository: ${ORG_NAME}/${repoName}`);
    } else if (createRes.status === 422) {
      console.log(`[INFO] Repository ${repoName} already exists. Continuing to permissions...`);
    } else {
      const err = await createRes.text();
      console.error(`[ERROR] Failed to create repository (${createRes.status}): ${err}`);
      return;
    }

    // Step 2: Grant the student collaborator access with push permissions
    const collabUrl = `https://api.github.com/repos/${ORG_NAME}/${repoName}/collaborators/${username}`;
    const collabRes = await fetch(collabUrl, {
      method: "PUT",
      headers: HEADERS,
      body: JSON.stringify({ permission: "push" })
    });

    if (collabRes.status === 201 || collabRes.status === 204) {
      console.log(`[OK] Invitation sent to @${username} with write/push permissions.`);
      console.log(`[URL] Clone URL: https://github.com/${ORG_NAME}/${repoName}.git`);
    } else {
      const err = await collabRes.text();
      console.error(`[ERROR] Failed to assign permissions to @${username} (${collabRes.status}): ${err}`);
    }
  } catch (error) {
    console.error(`[ERROR] Network failure processing @${username}:`, error.message);
  }
}

async function main() {
  if (GITHUB_TOKEN === "ghp_yourPersonalAccessTokenHere") {
    console.warn("WARNING: Please set your valid GitHub Personal Access Token in GITHUB_TOKEN.\n");
  }

  console.log(`Starting automated provisioning for ${STUDENTS.length} student(s) in organisation: ${ORG_NAME}`);
  for (const student of STUDENTS) {
    await provisionStudentRepo(student);
  }
  console.log("\n[COMPLETE] All student repositories have been processed.");
}

main();
