import {Component, OnInit} from '@angular/core';
import {DogService} from "./_services/dog.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'WebTechnologies';
  isLoading = true
  breeds: string[] = []
  currentBreed: string = ''

  loadedImages: Array<string> = []
  loadedAmount = 6

  showLoadBtn = false

  currentBreedFavImages = new Map<string, number>()
  likedImages: Array<string> = []
  totalFavImages = 0

  constructor(private dogService: DogService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
      this.fetchBreeds()
    }, 2000)


  }

  getCurrentBreedFavImg() {
    if (this.currentBreed == '') return 0
    else if (this.currentBreedFavImages.get(this.currentBreed) == null) return 0
    else return this.currentBreedFavImages.get(this.currentBreed)
  }

  fetchBreeds(): void {
    let breedsJson: any
    this.dogService.getDogBreeds().subscribe(dogResponse => {
        breedsJson = dogResponse.message
        console.log(breedsJson)
        this.breeds = Object.keys(breedsJson).map(str => str.charAt(0).toUpperCase() + str.substring(1))
      }
    )
  }

  loadImages(breed: string): void {
    this.loadedAmount = 6
    this.showLoadBtn = true
    this.loadedImages = []
    this.dogService.getBreedImages(breed).subscribe(dogResponse => {
      this.loadedImages = Object.values(dogResponse.message)
      console.log(this.loadedImages)
    })
    this.currentBreed = breed
  }

  loadMore(): void {
    this.loadedAmount += 6
    if (this.loadedAmount > this.loadedImages.length) {
      this.showLoadBtn = false
    }
  }

  isImageFavorite(imgUrl: string) {
    console.log(this.likedImages.includes(imgUrl))
    return this.likedImages.includes(imgUrl)
  }

  favoriteImage(image: string) {
    if (this.isImageFavorite(image)) {
      const index = this.likedImages.indexOf(image)
      this.likedImages.splice(index, 1)
      this.totalFavImages--;
      this.unFavoriteImageByBreed(image)
    } else {
      this.likedImages.push(image)
      this.totalFavImages++
      this.favoriteImageByBreed(image)
    }
  }

  favoriteImageByBreed(image:string) {
    if(this.currentBreedFavImages.has(this.currentBreed)) {
      // current breed exists
      const n = this.currentBreedFavImages.get(this.currentBreed)
      // @ts-ignore
      this.currentBreedFavImages.set(this.currentBreed, n+1)
    } else {
      this.currentBreedFavImages.set(this.currentBreed, 1)
    }
  }

  unFavoriteImageByBreed(image:string) {
    if(this.currentBreedFavImages.has(this.currentBreed)) {
      // current breed exists
      const n = this.currentBreedFavImages.get(this.currentBreed)
      // @ts-ignore
      this.currentBreedFavImages.set(this.currentBreed, n-1)
    }
  }
}
