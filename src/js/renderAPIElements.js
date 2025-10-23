import { fetchNews } from "./newsAPI";
import { fetchTimeSeries } from "./forexAPI";
import { 
    Chart, 
    LineController, // <-- Added this
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement, 
    Title, 
    Tooltip, 
    Legend 
} from "chart.js";

// Register all the necessary components for a line chart
Chart.register(
    LineController, // <-- Added this
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const ARTICLES_PER_PAGE = 8;
let allNewsArticles = [];
let currentPage = 0;

/**
 * Renders a slice of news articles to the DOM.
 * @param {Array} articles - The array of news articles to render.
 * @param {boolean} append - Whether to append to or replace the current articles.
 */
 function renderNewsArticles(articles, append = false) {
  const articlesContainer = document.querySelector('.articles-container');
  if (!articlesContainer) return;

  const cardsHtml = articles.map(article => `
        <article class = "news-card">
          ${article.image ? `<img src ="${article.image}" alt="${article.title}" class="news-image">` : ''}
          <div class="card-content">
            <h3><a href="${article.url}" target="_blank"> ${article.title}</a></h3>
            <p>${article.description || 'No description available.'}</p>
            <div class="card-meta">
              <span class="source">${article.source.toUpperCase()}</span>
              <span class="date">${new Date(article.published_at).toLocaleDateString()}</span>
            </div>
          </div>
        </article>
        `).join('');

  if (append) {
    articlesContainer.innerHTML += cardsHtml;
  } else {
    articlesContainer.innerHTML = cardsHtml;
  }
  // if (newsArticles.length > 0) {
  //   articlesContainer.innerHTML = newsArticles.map(article => `
  //       <article class = "news-card">
  //         ${article.urlToImage ? `<img src ="${article.urlToImage}" alt="${article.title}" class="news-image">` : ''}
  //         <div class="card-content">
  //           <h3><a href="${article.url}" target="_blank"> ${article.title}</a></h3>
  //           <p>${article.description || 'No description available.'}</p>
  //           <div class="card-meta">
  //             <span class="source">${article.source.name.toUpperCase()}</span>
  //             <span class="date">${new Date(article.publishedAt).toLocaleDateString()}</span>
  //           </div>
  //         </div>
  //       </article>
  //       `
  //   ).join('');
  // } else {
  //   articlesContainer.innerHTML = '<p>No news articles found or an error occurred.</p>'
  // }
}

/**
 * Initializes the news page by fetching and caching all articles,
 * then rendering the first 15.
 */
export async function initializeNewsPage() {
  const articlesContainer = document.querySelector('.articles-container');
  if (!articlesContainer) return;

  articlesContainer.innerHTML = '<p>Loading news...</p>';

  // Check for cached articles in local storage
  const cachedArticles = localStorage.getItem('newsArticles');
  if (cachedArticles) {
    allNewsArticles = JSON.parse(cachedArticles);
  } else {
    allNewsArticles = await fetchNews();
    if (allNewsArticles.length > 0) {
      localStorage.setItem('newsArticles', JSON.stringify(allNewsArticles));
    }
  }

  if (allNewsArticles.length > 0) {
    currentPage = 0
    const initialArticles = allNewsArticles.slice(0, ARTICLES_PER_PAGE);
    renderNewsArticles(initialArticles);
    attachLoadMoreListener();
  } else {
    articlesContainer.innerHTML = '<p>No news articles found or an error occurred.</p>'
  }
}

/**
 * Handles the "Load More" button click to display the next set of articles.
 */
function loadMoreArticles() {
  currentPage++;
  const startIndex = currentPage * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const newsArticles = allNewsArticles.slice(startIndex, endIndex);

  renderNewsArticles(newsArticles, true);

  const loadMoreBtn = document.getElementById('loadMoreBtn');
  if (endIndex >= allNewsArticles.length && loadMoreBtn) {
    loadMoreBtn.style.display = 'none';
  }
}

/**
 * Attaches the event listener to the "Load More" button.
 */
function attachLoadMoreListener() {
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  if (loadMoreBtn) {
    loadMoreBtn.style.display = 'block';
    loadMoreBtn.addEventListener('click', loadMoreArticles);
  }
}

export async function renderForexChart() {
  const chartContainer = document.querySelector('.forex-chart-container');
  const chartCanvas = document.getElementById('forexChart');
  if (!chartContainer || !chartCanvas) return;

  try {
    const historicalData = await fetchTimeSeries('USD', 'EUR', '2025-09-01');
    
    const dates = Object.keys(historicalData);
    const rates = dates.map(date => historicalData[date].EUR);

    new Chart(chartCanvas, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'USD to EUR',
          data: rates,
          borderColor: '#FF5722',
          borderWidth: 2,
          fill: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'category', 
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Rate'
            }
          }
        }
      }
    });
    chartContainer.querySelector('p').style.display = 'none';
  } catch (error) {
    console.log(error)
    chartContainer.querySelector('p').textContent = 'Error loading chart data.';
  }
}