class PomodoroTimer {
    constructor() {
        this.isRunning = false;
        this.timer;
        this.currentMode = 'work';
        this.workTime = 25 * 60; // 25分
        this.breakTime = 5 * 60; // 5分
        this.remainingTime = this.workTime;
        
        this.initializeElements();
        this.initializeEventListeners();
    }

    initializeElements() {
        this.timerElement = document.getElementById('timer');
        this.startButton = document.getElementById('start');
        this.stopButton = document.getElementById('stop');
        this.resetButton = document.getElementById('reset');
        this.workTimeInput = document.getElementById('workTime');
        this.breakTimeInput = document.getElementById('breakTime');
    }

    initializeEventListeners() {
        this.startButton.addEventListener('click', () => this.start());
        this.stopButton.addEventListener('click', () => this.stop());
        this.resetButton.addEventListener('click', () => this.reset());
        this.workTimeInput.addEventListener('change', () => this.updateWorkTime());
        this.breakTimeInput.addEventListener('change', () => this.updateBreakTime());
    }

    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.startButton.disabled = true;
        this.stopButton.disabled = false;
        this.resetButton.disabled = true;
        
        this.timer = setInterval(() => {
            if (this.remainingTime <= 0) {
                this.switchMode();
                return;
            }
            
            this.remainingTime--;
            this.updateDisplay();
        }, 1000);
    }

    stop() {
        if (!this.isRunning) return;
        
        this.isRunning = false;
        clearInterval(this.timer);
        
        this.startButton.disabled = false;
        this.stopButton.disabled = true;
        this.resetButton.disabled = false;
    }

    reset() {
        this.stop();
        this.remainingTime = this.currentMode === 'work' ? this.workTime : this.breakTime;
        this.updateDisplay();
    }

    switchMode() {
        this.stop();
        this.currentMode = this.currentMode === 'work' ? 'break' : 'work';
        this.remainingTime = this.currentMode === 'work' ? this.workTime : this.breakTime;
        this.updateDisplay();
        
        // モード切り替え時に音を鳴らす
        const audio = new Audio('https://notificationsounds.com/soundfiles/78704/download/notify-1.mp3');
        audio.play();
    }

    updateDisplay() {
        const minutes = Math.floor(this.remainingTime / 60);
        const seconds = this.remainingTime % 60;
        this.timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    updateWorkTime() {
        const newTime = parseInt(this.workTimeInput.value) * 60;
        if (this.currentMode === 'work') {
            this.remainingTime = newTime;
            this.updateDisplay();
        }
        this.workTime = newTime;
    }

    updateBreakTime() {
        const newTime = parseInt(this.breakTimeInput.value) * 60;
        if (this.currentMode === 'break') {
            this.remainingTime = newTime;
            this.updateDisplay();
        }
        this.breakTime = newTime;
    }
}

// インスタンスの作成
const pomodoroTimer = new PomodoroTimer();
