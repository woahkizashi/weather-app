// public/script.js

document.getElementById('fetchDefinition').addEventListener('click', async () => {
  const word = document.getElementById('word').value;
  if (!word) {
      alert('Please enter a word');
      return;
  }

  try {
      const response = await axios.get(`/api/define?word=${word}`);
      const definition = response.data[0].meanings[0].definitions[0].definition;

      document.getElementById('definition').innerHTML = `
          <h2>Definition of ${word}</h2>
          <p>${definition}</p>
      `;
  } catch (error) {
      console.error(error);
      alert('Error fetching data. Please try again later.');
  }
});

document.getElementById('fetchBooks').addEventListener('click', async () => {
  const title = document.getElementById('bookTitle').value;
  if (!title) {
      alert('Please enter a book title');
      return;
  }

  try {
      const response = await axios.get(`/api/books?title=${title}`);
      const books = response.data.docs;
      const booksHTML = books.map(book => `<li>${book.title} by ${book.author_name ? book.author_name.join(', ') : 'Unknown Author'}</li>`).join('');

      document.getElementById('books').innerHTML = `
          <h2>Books with title "${title}"</h2>
          <ul>${booksHTML}</ul>
      `;
  } catch (error) {
      console.error(error);
      alert('Error fetching data. Please try again later.');
  }
});

document.getElementById('fetchSpaceNews').addEventListener('click', async () => {
  try {
      const response = await axios.get('/api/spaceflight-news');
      const articles = response.data;
      const articlesHTML = articles.map(article => `<li><a href="${article.url}" target="_blank">${article.title}</a></li>`).join('');

      document.getElementById('spaceNews').innerHTML = `
          <h2>Latest Spaceflight News</h2>
          <ul>${articlesHTML}</ul>
      `;
  } catch (error) {
      console.error(error);
      alert('Error fetching data. Please try again later.');
  }
});

