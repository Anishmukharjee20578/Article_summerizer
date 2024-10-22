const summarizeBtn = document.getElementById('summarizeBtn');
const articleUrlInput = document.getElementById('articleUrl');
const summaryContainer = document.getElementById('summary');


summarizeBtn.addEventListener('click', function() {
    const articleUrl = articleUrlInput.value;


    if (!articleUrl) {
        summaryContainer.innerHTML = "Please enter a valid article URL!";
        return;
    }

    summarizeArticle(articleUrl);
});

function summarizeArticle(articleUrl) {

    const apiKey = 'YOUR_RAPIDAPI_KEY'; 

    const apiUrl = `https://smmry.p.rapidapi.com/&SM_API_KEY=${apiKey}&url=${encodeURIComponent(articleUrl)}`;

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'x-rapidapi-host': 'smmry.p.rapidapi.com',
            'x-rapidapi-key': apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
  
        if (data.sm_api_content) {
            summaryContainer.innerHTML = `<p>${data.sm_api_content}</p>`;
        } else {
            summaryContainer.innerHTML = "<p>Unable to summarize the article. Please try another link.</p>";
        }
    })
    .catch(error => {
        summaryContainer.innerHTML = "<p>Error fetching summary. Please check the URL and try again.</p>";
        console.error('Error:', error);
    });
}
