document.addEventListener('DOMContentLoaded', function() {
    // Get elements once when DOM loads
    const userInput = document.getElementById("date");
    const calculateBtn = document.getElementById("calculate-btn");
    const resultDiv = document.getElementById("result");
    
    // Set max date to today
    userInput.max = new Date().toISOString().split("T")[0];
    
    // Calculate button event listener
    calculateBtn.addEventListener('click', function() {
        calculateAge(userInput, resultDiv);
    });
    
    // Also calculate when pressing Enter in the date field
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculateAge(userInput, resultDiv);
        }
    });
});

function calculateAge(userInput, resultDiv) {
    const birthDate = new Date(userInput.value);
    
    // Validate input
    if (!userInput.value) {
        resultDiv.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <p>Please select your birth date</p>
            </div>
        `;
        return;
    }
    
    const today = new Date();
    
    // Check if birth date is in the future
    if (birthDate > today) {
        resultDiv.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <p>Birth date cannot be in the future!</p>
            </div>
        `;
        return;
    }
    
    let d1 = birthDate.getDate();
    let m1 = birthDate.getMonth() + 1;
    let y1 = birthDate.getFullYear();
    
    let d2 = today.getDate();
    let m2 = today.getMonth() + 1;
    let y2 = today.getFullYear();
    
    let d3, m3, y3;
    
    y3 = y2 - y1;
    
    if (m2 >= m1) {
        m3 = m2 - m1;
    } else {
        y3--;
        m3 = 12 + m2 - m1;
    }
    
    if (d2 >= d1) {
        d3 = d2 - d1;
    } else {
        m3--;
        d3 = getDaysInMonth(y1, m1) + d2 - d1;
    }
    
    if (m3 < 0) {
        m3 = 11;
        y3--;
    }
    
    // Display result with animation
    resultDiv.innerHTML = `
        <div class="age-result animate-result">
            <p>You are <span>${y3}</span> years, <span>${m3}</span> months and <span>${d3}</span> days old</p>
            <div class="confetti"><i class="fas fa-birthday-cake"></i></div>
        </div>
    `;
    
    // Add celebration effect for birthdays
    if (m1 === m2 && d1 === d2) {
        resultDiv.innerHTML += `
            <div class="birthday-message">
                <i class="fas fa-birthday-cake"></i>
                <p>Happy Birthday! 🎉</p>
            </div>
        `;
        celebrate();
    }
}

function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

function celebrate() {
    const colors = ['#6c63ff', '#ff6584', '#4d44db', '#ffb347'];
    const container = document.querySelector('.container');
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 10 + 5 + 'px';
            container.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 50);
    }
}