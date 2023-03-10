import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { NgForm } from "@angular/forms";

import { environment } from "src/environments/environment";
import { userData } from "./shared/models/user-data";
import { userProfileUpdateResponse } from "./shared/models/link-update-response";
import { ImageUploadResponse } from "./shared/models/upload-profile-img";
import { CartResponse } from "./shared/models/cart-response";
import { WishlistResponse } from "./shared/models/wishlit-response";
import { GetMyCourseResponse } from "./shared/models/get-my-courses";

@Injectable({
    providedIn: 'root'
})
export class MainService {
    baseUrl = environment.baseUrl;
    errorMessage = '';
    successMessage = '';
    errorMessageEmitter = new EventEmitter<string>()
    successMessageEmitter = new EventEmitter<string>()
    deletedFromCart = new EventEmitter<number>()

    constructor(private http: HttpClient) { }

    getProdileData() {
        console.log('called profile picker')
        return this.http.get<userData>(`${this.baseUrl}/userProfile`)
    }

    // to save user's public profile links
    saveUserLinks(links: NgForm) {
        // send links to server
        return this.http.post<userProfileUpdateResponse>(
            `${this.baseUrl}/saveUserLinks`,
            links.value
        )
    }

    // to upload profile pic
    uploadImage(uploadImage: FormData) {
        return this.http.post<ImageUploadResponse>(
            `${this.baseUrl}/saveProfilePic`,
            uploadImage
        )
    }

    // to get all cart data
    getCart() {
        return this.http.get<CartResponse>(`${this.baseUrl}/getCart`)
    }

    // to remove one item from cart
    removeFromCart(id: string) {
        return this.http.delete(`${this.baseUrl}/removeFromCart/${id}`)
    }

    // to get wishlist data
    getWishlistData() {
        return this.http.get<WishlistResponse>(`${this.baseUrl}/getWishlists`)
    }

    // to remove an item from wishlist
    removeFromWishlist(id: string) {
        return this.http.delete(`${this.baseUrl}/removeFromWishlist/${id}`)
    }

    // to pay cart amount using stripe
    payMoney() {
        return this.http.get(`${this.baseUrl}/placeCartOrder`)
    }

    // verify payment
    verifyPayment(token: string) {
        return this.http.post(`${environment.baseUrl}/payment/verify`, {
            token: token
        })
    } 

    // to get all enrolled courses
    getMyCourses(index: number) {
        return this.http.get<GetMyCourseResponse>(`${this.baseUrl}/enrolledCourses/`)
    }

}