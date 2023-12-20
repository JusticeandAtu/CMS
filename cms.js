
// Function to update prices in pricelist.js using GitHub API
async function updatePrices(item) {
    const newPrice = document.getElementById(item).value;
  
    // Replace with your GitHub information
    const username = 'JusticeandAtu';
    const repoName = 'reserve-page';
    const filePath = 'assets/js/pricelist.js';
    const token = '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';
  
    // Fetch the current data from GitHub
    const apiUrl = `https://api.github.com/repos/${username}/${repoName}/contents/${filePath}`;
  
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
  
    const data = await response.json();
    const currentContent = atob(data.content);
  
    // Update the price for the specified item
    const updatedContent = currentContent.replace(
      new RegExp(`(\\b${item}\\s*:\\s*'\\$)[^']*`),
      `$1${newPrice}`
    );
  
    // Encode the updated content
    const encodedContent = btoa(updatedContent);
  
    // Prepare the payload for updating the file
    const payload = {
      message: `Update ${item} price via CMS`,
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
    confirm(`${item} price updated successfully:`, updatedDataFromGitHub);
  
    // Refresh the displayed prices
    // displayPrices(updatedDataFromGitHub);
  }
  
  // Function to display prices on the page
//   function displayPrices(data) {
//     // Your display logic here
//     console.log('Display prices:', data);
//   }
  