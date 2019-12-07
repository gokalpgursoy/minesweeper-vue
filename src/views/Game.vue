<template>
  <div style="height:100vh;">
    <div class="row h-100 d-flex justify-content-center align-items-center">
      <div class="col-md-12">
        <div class="card" style="width: 100%;">
          <!-- <img src="..." class="card-img-top" alt="..." /> -->
          <div class="card-body">
            <div class="row">
              <div class="col-md-5">
                <div class="row name-div m-0">
                  <div class="col-md-6">
                    <span class="text-secondary">Name</span>
                  </div>
                  <div class="col-md-6">
                    <span
                      class="float-right"
                    >{{this.$route.params.name}} {{this.$route.params.surname}}</span>
                  </div>
                </div>
              </div>
              <div class="col-md-5">
                <div class="row name-div m-0">
                  <div class="col-md-6">
                    <span class="text-secondary">Score</span>
                  </div>
                  <div class="col-md-6">
                    <span class="float-right">{{score}}</span>
                  </div>
                </div>
              </div>
              <div class="col-md-2">
                <button @click="restart()" class="btn btn-block btn-restart h-100">
                  <i class="fas fa-redo"></i> Restart
                </button>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-md-10">
                <!-- <template v-for="i in rowCount">
                  <template v-for="k in columnCount">
                    <div :key="i + 100 + k" class="cell"></div>
                  </template>
                </template>-->
                <table class="w-100" v-if="showTable" ref="tbl">
                  <tr v-for="i in rowCount" :key="i">
                    <td v-for="k in columnCount" :key="k + i">
                      <div class="cell" @click="cellClicked(i, k)" :ref="`cell_${i}_${k}`"></div>
                    </td>
                  </tr>
                </table>
              </div>
              <div class="col-md-2">
                  <div class="row top-score-bar">
                      <div class="col-md-12">
                          Top 10
                      </div>
                  </div>
                  <hr>
                  <div class="row">
                      <div class="col-md-12" v-for="(score, i) in scores" :key="score">
                          {{i + 1}}- Score: {{score.score}} 
                          <span> {{score.name}}</span>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store/index";
export default {
  created() {
    this.setCells();
  },
  data() {
    return {
      score: 0,
      rowCount: 100,
      columnCount: 100,
      mines: [],
      showTable: true,
      scores: [],
    };
  },
  methods: {
    cellClicked(row, column) {
      const clickedCellRef = `cell_${row}_${column}`;
      const element = this.$refs[clickedCellRef][0];
      if (this.mines.find(x => x.row === row && x.column === column)) {
        // element.classList.add("wrong-mine");
        for (const item of this.mines) {
          const minedCellRef = `cell_${item.row}_${item.column}`;
          const element = this.$refs[minedCellRef][0];
          element.classList.add("wrong-mine");
        }
        setTimeout(() => {
          Swal.fire({
            title: "Game Over!",
            text: `Your Score is ${this.score}, Play again?`,
            icon: "error",
            showCancelButton: true,
            confirmButtonText: "Try Again",
            cancelButtonText: "New Game"
          }).then(res => {
            console.log("res", res);
            this.$store.commit("addScore", {
              name: this.$route.params.name + " " + this.$route.params.surname,
              score: this.score
            });
            if (res.value) {
              //   //try again
              //   this.showTable = false;
              //   //   this.$router.push({ name: "game", params: this.$route.params });
              //   this.showTable = true;
              //   //   location.reload();
              //   this.setCells();
              this.restartGame();
            } else {
              this.$router.push({ name: "login" });
            }
          });
        }, 2000);
      } else {
        element.classList.add("correct-mine");
        this.score += 5;
      }
    },
    restartGame() {
      for (let i = 1; i <= this.rowCount; i++) {
        for (let k = 1; k <= this.columnCount; k++) {
          const clickedCellRef = `cell_${i}_${k}`;
          const element = this.$refs[clickedCellRef][0];
          element.classList.remove('wrong-mine');
          element.classList.remove('correct-mine');
        }
      }
      this.setCells();
    },
    setCells() {
      this.mines = [];
      this.rowCount = 0;
      this.columnCount = 0;
      this.score = 0;
      this.rowCount = Number(this.$route.params.size.split("x")[0]);
      this.columnCount = Number(this.$route.params.size.split("x")[1]);
      for (let i = 0; i < 5; i++) {
        const randomRow = Math.floor(Math.random() * this.rowCount) + 1;
        const randomColumn = Math.floor(Math.random() * this.columnCount) + 1;
        const obj = {
          row: randomRow,
          column: randomColumn
        };
        this.mines.push(obj);
      }
      this.scores = this.$store.state.scores.sort((a, b) => b.score - a.score).slice(0, 10);
    }
  }
};
</script>

<style>
.name-div {
  background-color: lightgray;
  height: 50px;
  display: flex;
  align-items: center;
  border-radius: 5px;
}
.btn-restart {
  background-color: #ff851b;
  color: white;
}

.cell {
  background-color: #7c92a9;
  width: 170px;
  height: 100px;
  border-radius: 5px;
  margin: 2px;
  float: left;
}

.correct-mine {
  background-image: url("../assets/check.png");
  background-color: white;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.wrong-mine {
  background-image: url("../assets/mine.png");
  background-color: white;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.top-score-bar {
    background-color: aqua;
    height: 50px;
    border-radius: 5px;
    color: white;
    font-size: 20px;
}
</style>