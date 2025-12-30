import { Component, inject, OnInit, signal } from "@angular/core";
import { Store } from "@ngrx/store";
import { productActions } from "./store/product-actions";
import { productFeature } from "./store/product-feature";
import { toSignal } from "@angular/core/rxjs-interop";
import { ProductCard } from "../../core/components/product-card/product-card";
import { FormsModule } from "@angular/forms";
import { Product } from "./types/product-type";
import { cartActions } from "../cart/store/cart-actions";

@Component({
    selector: "app-products",
    imports: [ProductCard, FormsModule],
    templateUrl: './products.html'
})
export class Products implements OnInit {

    private readonly store = inject(Store);

    protected readonly products = toSignal(this.store.select(productFeature.selectFilteredProducts));

    protected readonly loading = toSignal(this.store.select(productFeature.selectLoading));

    protected searchQuery = signal('');

    ngOnInit(): void {
        this.store.dispatch(productActions.load());
    }

    protected onSearch(query: string): void {
        this.store.dispatch(productActions.search({ searchQuery: query}));
    }

    protected onAddToCart(product: Product) {
        this.store.dispatch(cartActions.addToCart({product}));
    }

}