import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { LucideAngularModule, Star } from 'lucide-angular';
import { Product } from '../../../pages/products/types/product-type';
import { Button } from '../../../shared/components/button';
import { CurrencyPipe } from '@angular/common';

@Component({
    selector: 'app-product-card',
    imports: [Button, LucideAngularModule, CurrencyPipe],
    templateUrl: './product-card.html',
    host: {
        class: 'block bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCard {

    readonly icons = { Star }
    readonly product = input.required<Product>();
    readonly addToCart = output<Product>();
}