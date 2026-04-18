import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

export function getImage(id: string): ImagePlaceholder {
    return PlaceHolderImages.find(img => img.id === id) || PlaceHolderImages[0];
}
