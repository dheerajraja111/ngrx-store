import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { LucideAngularModule, ShoppingBag, Plus, Minus, Trash2 } from "lucide-angular";
import { Button } from "../../shared/components/button";
import { Store } from "@ngrx/store";
import { toSignal } from "@angular/core/rxjs-interop";
import { cartFeature } from "./store/cart-feature";
import { CurrencyPipe } from "@angular/common";
import { cartActions } from "./store/cart-actions";

@Component({
    selector: "app-cart",
    templateUrl: "./cart.html",
    imports: [LucideAngularModule, RouterLink, Button, CurrencyPipe]
})
export class Cart {
    protected readonly icons = { ShoppingBag, Plus, Minus, Trash2 };
    private readonly store = inject(Store);

    protected readonly loading = toSignal(this.store.select(cartFeature.selectLoading));
    protected readonly items = toSignal(this.store.select(cartFeature.selectItems));
    protected readonly cartTotal = toSignal(this.store.select(cartFeature.selectCartTotal), {
        initialValue: 0
    });
    protected readonly cartCount = toSignal(this.store.select(cartFeature.selectCartCount), {
        initialValue: 0
    });

    protected onRemove(productId: number) {
        this.store.dispatch(cartActions.removeFromCart({productId}));
    }

    protected onUpdateQuantity(productId: number, quantity: number) {
        this.store.dispatch(cartActions.updateQuantity({productId, quantity}));
    }

    protected onClearCart() {
        this.store.dispatch(cartActions.clearCart());
    }
}