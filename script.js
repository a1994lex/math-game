let app = new Vue({
  el: '#app',
  data: {
    error: '',
    state: 'Start',
    points: '',
    rounds: 0,
    maxRounds: 5,
    questions: [
      {
        type: 'circle',
        text: 'How many more degrees do I need to become a full circle?',
        circleDegrees: 0, // between 0 and 1
      },
    ],
    question: {
      type: '',
      text: '',
      answer: '',
    },
    showToast: false,
  },
  created() {
    // this.startGame()
  },
  methods: {
    init_question() {
      switch(this.question.type) {
        case 'circle':
          this.circle_init()
      }
    },
    circle_init() {
      this.question.circleDegrees = degrees[Math.floor(Math.random()*degrees.length)]
    },
    startGame() {
      // starts a game
      this.newRound()
      this.state = 'Play'
    },
    setIndex(){
      this.question = this.questions[Math.floor(Math.random()*this.questions.length)];
    },
    newRound() {
      this.rounds++
      if (this.rounds > this.maxRounds) {
        this.endGame()
      }
      this.setIndex()
      this.init_question()
    },
    doToast() {
      this.showToast = true
      setTimeout(()=>{
        this.showToast = false
      }, 1500)
    },
    endGame() {
      this.rounds = 0
      this.state = 'End'
    },
    backToStart() {
      this.state = 'Play'
    },
    observeCircleDegrees() {
      let added = this.question.answer || 0
      if (this.question.circleDegrees + added === 360) {
        if (this.rounds !== this.maxRounds){
          this.doToast()
        }
        setTimeout(()=>{
          this.question.answer = ''
          this.newRound()
        }, 300)
      }
      else if (this.question.circleDegrees + added > 360) {
        this.error = true
      }
      else {
        this.error = false
      }
    }
  },
  computed: {
    circlePercent() {
      if (this.question.circleDegrees) {
        let added = this.question.answer || 0
        if ((this.question.circleDegrees + added) > 360) return 1
        return ((this.question.circleDegrees + added) / 360)
      }
      return 1
    },
    path() {
      const startX = getCoordinatesForPercent(0)[0]
      const startY = getCoordinatesForPercent(0)[1]
      const endX = getCoordinatesForPercent(this.circlePercent)[0]
      const endY = getCoordinatesForPercent(this.circlePercent)[1]
      const largeArcFlag = this.circlePercent > 0.5 ? 1 : 0
      return [
        `M ${startX} ${startY}`,
			  `A 1 1 0 ${largeArcFlag} 0 ${endX} ${endY}`,
			  `L 0 0`
      ].join(' ')
    }
  },
  watch: {
    "question.answer": function(val, prev) {
        if (this.question.type === 'circle') {
          console.log(val)
          this.observeCircleDegrees()

        }
      }
  }
})

function getCoordinatesForPercent(percent) {
		const x = Math.cos(2 * Math.PI * percent)
		const y = -Math.sin(2 * Math.PI * percent)
		return [x, y]
	}

const degrees = [
  45, 90, 30, 60, 120, 180, 150, 210, 240, 270, 300, 300, 330, 135, 225, 315
]
