<template>
  <div style="height:100vh;">
    <div class="row h-100 d-flex justify-content-center align-items-center">
      <div class="col-md-4">
        <div class="card" style="width: 18rem;">
          <!-- <img src="..." class="card-img-top" alt="..." /> -->
          <div class="card-body">
            <form>
              <div class="form-group">
                <label for="exampleInputEmail1">Name</label>
                <input type="text" class="form-control" placeholder="Name" v-model="userData.name" />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Surname</label>
                <input type="text" class="form-control" placeholder="Surname" v-model="userData.surname" />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Choose Size</label>
                <select class="form-control" v-model="userData.size">
                    <option v-for="size in sizes" :key="size" :value="size">{{size}}</option>
                </select>
              </div>
              <button type="button" class="btn btn-success btn-block" @click="login()">Start Game</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: {
        name: "",
        surname: "",
        size: '5x5',
      },
      sizes: ['5x5', '6x6', '7x7']
    };
  },
  methods: {
    login() {
      console.log("Oyuna gönder", this.userData);
      this.$router.push({name: 'game', params: this.userData})
    }
  }
};
</script>

<style>
</style>