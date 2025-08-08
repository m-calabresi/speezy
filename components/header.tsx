import ProfileModal from "@/components/modals/profile";

export default function Header() {
    return (
        <header className="flex flex-row items-center justify-between pt-3 pb-6">
            <h1 className="font-bricolage-grotesque text-4xl font-medium">speezy</h1>
            <ProfileModal />
        </header>
    );
}
