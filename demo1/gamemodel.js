function Cell(row, col) {
  this.row = row
  this.col = col
  this.condition = 0
  this.castle = false
}

Cell.prototype.toString = function() {
  return "[" + this.row + "][" + this.col + "]:" + this.color
}

function GameModel(n, m, initPos) {
  this.rows = n
  this.cols = m
  this.field = []
  this.colors = ['green', 'red']
  this.initPos = initPos

  this.ngetfuncs = [
    function(i, j) {
      return {
        "i": i - 1,
        "j": j
      }
    },
    function(i, j) {
      return {
        "i": i,
        "j": j + 1
      }
    },
    function(i, j) {
      return {
        "i": i + 1,
        "j": j + 1
      }
    },
    function(i, j) {
      return {
        "i": i + 1,
        "j": j
      }
    },
    function(i, j) {
      return {
        "i": i + 1,
        "j": j - 1
      }
    },
    function(i, j) {
      return {
        "i": i,
        "j": j - 1
      }
    }
  ]

}


GameModel.prototype.makearr = function() {
  var arr = []
  for (var i = 0; i < this.rows; i++) {
    for (var j = 0; j < this.cols; j++) {
      if (!arr[i]) arr[i] = []
      arr[i][j] = new Cell(i, j)
    }
  }
  this.field = arr
}

GameModel.prototype.isInRange = function(i, j) {
  return i >= 0 && i < this.rows && j >= 0 && j < this.cols
}

GameModel.prototype.getNeighbor = function(i, j, n) {
  if (n < 0 || n > 5) return undefined
  if (!this.isInRange(i, j)) return undefined
  var nc = this.ngetfuncs[n](i, j)
  if (this.isInRange(nc.i, nc.j)) return this.field[nc.i][nc.j]
  return undefined
}

GameModel.prototype.isTurnValid = function(player, r, c) {
  if (!isInRange(r, c)) return false
  if (this.field[r][c].castle) return false
  var f = false
  for (var i = 0; i < 6; i++) {
    var k = this.getNeighbor(r, c, i)
    if (k === undefined) continue
    if (k.condition === player) {
      f = true
      break
    }
  }
  return f
}

GameModel.prototype.takeCell = function(player, r, c) {
  this.field[r][c].condition = player
  this.field[r][c].castle = true
  for (var i = 0; i < 6; i++) {
    var k = this.getNeighbor(r, c, i)
    if (k !== undefined) {
      this.field[k.row][k.col].condition = player
    }
  }
}

GameModel.prototype.setInitPos = function() {
  console.log(this.initPos)
  this.takeCell(1, this.initPos[0][0], this.initPos[0][1])
  this.takeCell(2, this.initPos[1][0], this.initPos[1][1])
}

GameModel.prototype.makeTurn = function(player, r, c) {
  if (this.isTurnValid(player, r, c)) {
    this.takeCell(player, r, c)
    return true
  }
  return false
}

var game = new GameModel(6, 6, [
  [2, 2],
  [4, 4]
])

game.makearr()
game.setInitPos()
console.log(game.field)
