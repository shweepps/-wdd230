document.addEventListener('DOMContentLoaded', function() {
    const chapterInput = document.getElementById('chapterInput');
    const addChapterBtn = document.getElementById('addChapterBtn');
    const chapterList = document.getElementById('chapterList');
  
    addChapterBtn.addEventListener('click', function() {
      const chapterTitle = chapterInput.value.trim();
  
      if (chapterTitle !== '') {
        const li = document.createElement('li');
        const deleteBtn = document.createElement('button');
  
        li.innerHTML = chapterTitle;
        deleteBtn.textContent = '❌';
        deleteBtn.classList.add('delete-btn');
  
        deleteBtn.addEventListener('click', function() {
          li.remove();
        });
  
        li.appendChild(deleteBtn);
        chapterList.appendChild(li);
  
        chapterInput.value = '';
        chapterInput.focus();
      }
    });
  });
  