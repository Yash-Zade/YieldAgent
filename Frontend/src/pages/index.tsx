import { AcmeHero } from "@/components/acme-hero";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
    return(
        <DefaultLayout>
            <AcmeHero />
        </DefaultLayout>
    );
}