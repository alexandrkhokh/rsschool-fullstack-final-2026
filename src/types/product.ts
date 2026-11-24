interface Product {
    id: number
    title: {
        rendered: string
    }
    link: string
    featured_media: number
    price_html: string
    acf: {
        pump_power: number
        pump_head: number
        pump_flow: number
    }
    _embedded: {
        'wp:featuredmedia': FeaturedMedia[]
    }
    price_data: {
        currency: string
        price: string
        regular_price: string
        sale_price?: string
    }
}

interface FeaturedMedia {
    id: number
    source_url: string
    media_details: {
        sizes: MediaSizes
    }
}

interface MediaSize {
    file: string
    width: number
    height: number
    mime_type: string
    source_url: string
    filesize?: number
    uncropped?: boolean
}

type MediaSizes = Partial<Record<WpImageSizeName, MediaSize>> & Record<string, MediaSize | undefined>

type WpImageSizeName =
    | 'thumbnail'
    | 'medium'
    | 'medium_large'
    | 'large'
    | 'full'
    | 'woocommerce_thumbnail'
    | 'woocommerce_single'
    | 'woocommerce_gallery_thumbnail'

export type { Product }
