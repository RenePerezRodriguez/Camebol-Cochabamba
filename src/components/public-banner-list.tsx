import { getActiveBanners } from "@/actions/banners";
import { AnnouncementBar } from "@/components/layout/announcement-bar";

interface PublicBannerListProps {
    isTransparent?: boolean;
}

export async function PublicBannerList({ isTransparent }: PublicBannerListProps) {
    const banners = await getActiveBanners();

    if (banners.length === 0) return null;

    // Show the most recent active banner
    const activeBanner = banners[0];

    return (
        <AnnouncementBar 
            id={activeBanner.id}
            text={activeBanner.content}
            link={activeBanner.link}
            type={activeBanner.type as any}
            isTransparent={isTransparent} 
        />
    );
}
