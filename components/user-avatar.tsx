import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type UserAvatarProps = React.ComponentProps<typeof Avatar> & {
    image: string;
    fallback: string;
    fallbackClassName?: string;
};

export const UserAvatar = ({ image, fallback, className, fallbackClassName, ...props }: UserAvatarProps) => (
    <Avatar
        className={cn("h-10 w-10", className)}
        {...props}>
        <AvatarImage src={image} />
        <AvatarFallback className={cn("bg-primary text-primary-foreground font-semibold uppercase", fallbackClassName)}>{fallback}</AvatarFallback>
    </Avatar>
);
