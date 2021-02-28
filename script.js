document.querySelector(".hamburguer").addEventListener("click", () =>
    document.querySelector(".container").classList.toggle("show-menu"));

document.querySelector("#qtde").addEventListener("change", atualizarPreco)
document.querySelector("#js").addEventListener("change", atualizarPreco)
document.querySelector("#layout-sim").addEventListener("change", atualizarPreco)
document.querySelector("#layout-nao").addEventListener("change", atualizarPreco)
document.querySelector("#prazo").addEventListener("change", function (){
    const prazo = document.querySelector("#prazo").value
    document.querySelector("label[for=prazo]").innerHTML = `Prazo: ${prazo} semanas`

})

function atualizarPreco(){
    const qtde = document.querySelector("#qtde").value
    const temJS = document.querySelector("#js").checked
    const incluiLayout = document.querySelector("#layout-sim").checked
    const prazo = document.querySelector("#prazo").value

    let preco = qtde * 100;
    if (temJS)preco *=  1.1
    if (incluiLayout) preco += 500
    let taxaUrgencia = 1 - prazo*0.1;
    preco *= 1 + taxaUrgencia
    
   
    document.querySelector("#preco").innerHTML = `R$ ${preco.toFixed(2)}`
}

//stories
class SlideStories {
    constructor(id){
        this.slide = document.querySelector(`[data-slide="${id}"]`);
        this.active = 0;
        this.init() 
       
    }
    activeSlide(index){
        this.active = index;
        this.items.forEach((item) => item.classList.remove('active'));
        this.items[index].classList.add('active');
        this.thumbItems.forEach((item) => item.classList.remove('active'));
        this.thumbItems[index].classList.add('active');
        this.autoSlide();
    }

    prev(){
        if(this.active > 0){
            this.activeSlide(this.active - 1);
        } else {
            this.activeSlide(this.items.length -1)
        }
                
    }

    next(){
        if ( this.active < this.items.length -1){
            this.activeSlide(this.active + 1);
        } else {
            this.activeSlide(0);
        }
         
    }

    addNavegation(){
         const nextBtn = this.slide.querySelector('.slide-next');
         const prevBtn = this.slide.querySelector('.slide-prev');
         nextBtn.addEventListener('click' , this.next);
         prevBtn.addEventListener('click' , this.prev);
         
    }

    addThumbItems(){
        this.items.forEach(() => (this.thumb.innerHTML += `<span></span>`));
        this.thumbItems = Array.from(this.thumb.children);
        console.log(this.addThumbItems)
    }

    autoSlide(){
        clearTimeout(this.timeout);
        this.timeout = setTimeout(this.next, 5000);

    }

    init(){
         this.next = this.next.bind(this);
         this.prev = this.prev.bind(this);
         this.items = this.slide.querySelectorAll('.slide-items > *');
         this.thumb = this.slide.querySelector('.slide-thumb')
         this.addThumbItems();
         this.activeSlide(0)
         this.addNavegation();
    }

}

new SlideStories('slide');
