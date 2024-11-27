export const SITE_TITLE = "STEM for Society";
export type Social = "email" | "phone" | "discord" | "github" | "slack";
export type SocialType = "link" | "copy";

export const socialType: Record<Social, SocialType> = {
    discord: "copy",
    email: "copy",
    github: "link",
    phone: "copy",
    slack: "copy",
};
