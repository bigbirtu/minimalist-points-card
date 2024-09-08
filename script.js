document.addEventListener('DOMContentLoaded', () => {
  // 修改這裡：從 localStorage 讀取點數，如果沒有則使用 0
  let points = parseInt(localStorage.getItem('points')) || 0;
  const totalPoints = 30;
  const addPointButton = document.getElementById('addPoint');
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');
  const pointsContainer = document.getElementById('points-container');

  function createPoints() {
    // 保持原有的 createPoints 函數不變
    for (let row = 0; row < 3; row++) {
      const rowElement = document.createElement('div');
      rowElement.className = 'row';
      for (let i = 1; i <= 10; i++) {
        const point = document.createElement('div');
        point.className = 'point';
        point.textContent = row * 10 + i;
        rowElement.appendChild(point);
      }
      pointsContainer.appendChild(rowElement);
    }
  }

  function updatePoints() {
    const allPoints = document.querySelectorAll('.point');
    allPoints.forEach((point, index) => {
      point.classList.remove('checked');
      point.querySelector('.date')?.remove();
      point.querySelector('.caption')?.remove();
    });

    for (let i = 0; i < points; i++) {
      const point = allPoints[i];
      point.classList.add('checked');
      
      const dateEl = document.createElement('div');
      dateEl.className = 'date';
      const date = new Date();
      dateEl.textContent = `${date.getMonth() + 1}/${date.getDate()}`;
      point.appendChild(dateEl);

      if (i === 9 || i === 19 || i === 29) {
        const captionEl = document.createElement('div');
        captionEl.className = 'caption';
        captionEl.textContent = i === 9 ? '可以開始新履歷了！' :
                                i === 19 ? '可以投履歷了！' :
                                '可以提離職了！';
        point.appendChild(captionEl);
      }
    }

    const progressPercentage = Math.round((points / totalPoints) * 100);
    progressBar.style.width = `${progressPercentage}%`;
    progressText.textContent = `${progressPercentage}%`;

    // 添加這行：更新完畫面後，將點數儲存到 localStorage
    localStorage.setItem('points', points.toString());
  }

  function showEncouragement() {
    // 保持原有的 showEncouragement 函數不變
    const messages = [
      '加油！你已經開始了離職的旅程！',
      '繼續堅持，你正在為自己的未來努力！',
      '每一步都是進步，你做得很棒！',
      '不要放棄，你離目標越來越近了！',
      '你的決心令人欽佩，繼續前進！'
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    alert(`${randomMessage}\n目前已集 ${points} 點`);
  }

  addPointButton.addEventListener('click', () => {
    if (points < totalPoints) {
      points += 1;
      updatePoints();
      showEncouragement();
    }
  });

  createPoints();
  updatePoints();
});