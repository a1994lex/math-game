let app = new Vue({
  el: '#app',
  data: {
    circleDegrees: 150, // between 0 and 1
    state: 'Start',
    points: '',
    rounds: '',
  },
  methods: {
    startGame() {
      // starts a game
      this.state = 'End'
    },
    newRound() {
      // starts a round, 5 rounds in a game
    },
    endGame() {
      this.state = 'End'
    },
    backToStart() {
      this.state = 'Start'
    },
  },
  computed: {
    circlePercent() {
      return this.circleDegrees / 360
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
  }
})

function getCoordinatesForPercent(percent) {
		const x = Math.cos(2 * Math.PI * percent)
		const y = -Math.sin(2 * Math.PI * percent)
		return [x, y]
	}
