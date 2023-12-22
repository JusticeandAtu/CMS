// Replace 'YOUR_GITHUB_TOKEN' with your actual GitHub token
const yourGitHubToken = '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s';

// Replace 'JusticeandAtu', 'reserve-page', and 'assets/js/pricelist.js' with your GitHub information
const yourGitHubUsername = 'JusticeandAtu';
const yourGitHubRepoName = 'reserve-page';
const yourFilePath = 'assets/js/pricelist.js';

// Replace 'serviceNameInputId' with the actual ID of your input element
const serviceNameInputId = 'hairCutting';

// Replace 'newPriceValue' with the actual new price value you want to set
const newPriceValue = 99; // Example new price

// Call the updatePrices function with the service name and new price
updatePrices(serviceNameInputId, newPriceValue);

async function updatePrices(service, newPrice) {
  // Ensure the token is properly assigned
  const token = yourGitHubToken;

  // Confirm the change (optional)
  confirm('We\'re changing service');

  // Construct the GitHub API URL
  const apiUrl = `https://api.github.com/repos/${yourGitHubUsername}/${yourGitHubRepoName}/contents/${yourFilePath}`;

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
    new RegExp(`(\\bserviceName\\s*:\\s*'${service}'\\s*,\\s*price\\s*:\\s*)\\d+`),
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
