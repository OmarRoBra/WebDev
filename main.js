if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
    .then(reg => console.log('Registro de SW exitoso', reg))
    .catch(err => console.warn('Error al tratar de registrar el sw', err))
}
//Tabla
const tableBody = new Vue({
    el: '#tableBody',
    data: {
        storageData: JSON.parse(localStorage.getItem('Data'))
    },
    methods:{
        deleteData(index){
            console.log("XD")
            this.storageData.splice(index,1)
            localStorage.Data = JSON.stringify(this.storageData);
        
        }
    }
})

const carrousel= new Vue({
    el:'#carrousel',
    data:{
        direction: 1,
        num: 0, 
        image: ['1','2','3','4jpg',]
    },
    methods: {
        startCarousel(){
            this.num+=this.direction;
            if (this.num > this.image.length-1) this.num = 0;
            if (this.num < 0) this.num = this.image.length-1;
            document.getElementById("imagen").src=" WebDev/img/" +this.image[this.num] + ".jpg";  
        },
        prevImage(){
            this.direction = -1;
            clearInterval(startInterval);
            startInterval = setInterval(this.startCarousel,3000);
            this.startCarousel();
        },
        nextImage(){
            this.direction = 1;
            clearInterval(startInterval);
            startInterval = setInterval(this.startCarousel,3000);
            this.startCarousel();
        }
    }
})

var startInterval = setInterval(carrousel.startCarousel,3000);
const tabla = new Vue({
    el: '#myTable',
    data: {
        titles: ['Nombre','Apellido','Edad','País','Email','Cumpleaños']
    }
});


//Formulario
const formulario = new Vue({
    el: '#addNew',
    data: {
        userData: {
            name:'',
            lastname:'',
            age:'',
            country:'',
            email:'',
            date:''

        },
        
        delete: '<input type="button" value="x" v-on:click="deleteData">'
    },
    methods:{
        reviewData(){
           let emailRegex =/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

            if(this.userData.name == '' || this.userData.lastname=='' || this.userData.age==''|| this.userData.country=='' || this.userData.email=='' || this.userData.date==''){
                alert("Campos vacios")

              }
              else if( !emailRegex.test(this.userData.email)){
                  alert("Correo invalido")
                  
              }
              
            else {
                this.saveData();
            }
        },

        saveData(){
            let data = localStorage.getItem('Data');
            let dataList = [];
            if (data) {
                dataList = JSON.parse(data);
                dataList.push(this.userData);
                localStorage.setItem('Data',JSON.stringify(dataList));
                data = localStorage.getItem('Data');
                tableBody.storageData = JSON.parse(data);
            } else {
                dataList = [];
                dataList.push(this.userData);
                localStorage.setItem('Data',JSON.stringify(dataList));
                data = localStorage.getItem('Data');
                tableBody.storageData = JSON.parse(data);
            }
        }
    }
})


