async function updatePrices(service) {
  const newPrice = document.getElementById(service).value;
  // newtoken: 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

  // Fill in your GitHub information
  const username = 'JusticeandAtu'; // Updated GitHub username
  const repoName = 'reserve-page'; // Updated GitHub repository name
  const filePath = 'assets/js/pricelist.js'; // Updated file path within the repository
  const token = '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s'; // Replace with your GitHub token

  // Construct the GitHub API URL
  const apiUrl = `https://api.github.com/repos/${username}/${repoName}/contents/${filePath}`;

  // Fetch the current data from GitHub
  const response = await fetch(apiUrl, {
    headers: {
      Authorization: `token ${token}`,
    },
  });

  const data = await response.json();
  const currentContent = atob(data.content);

  // Update the price for the specified service
  const updatedContent = currentContent.replace(
    new RegExp(`(\\b${service}['"]?\\s*:\\s*)\\d+`),
    `$1${newPrice}`
  );

  // Encode the updated content
  const encodedContent = btoa(updatedContent);

  // Prepare the payload for updating the file
  const payload = {
    message: `Update ${service} price via CMS`,
    content: encodedContent,
    sha: data.sha,
  };

  // Update the content on GitHub
  const updateResponse = await fetch(apiUrl, {
    method: 'PUT',
    headers: {
      Authorization: `token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const updatedDataFromGitHub = await updateResponse.json();
  console.log(`${service} price updated successfully:`, updatedDataFromGitHub);
} 
