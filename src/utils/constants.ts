export enum AUTH_ROLES {
  USER,
}

export const COOKIE_NAME_JWT_TOKEN = "JWT_TOKEN";

export const VISITOR_SIADBARS: { label: string; tab: string }[] = [
  {
    label: "User Info",
    tab: "",
  },
  {
    label: "Torrent Status",
    tab: "torrentsStatus",
  },
];

export const PROFILE_SIDEBARS: { label: string; tab: string }[] = [
  {
    label: "User Info",
    tab: "",
  },
  {
    label: "Torrents Status",
    tab: "torrentsStatus",
  },
  {
    label: "Send Invitation",
    tab: "invitations",
  },
  {
    label: "Security",
    tab: "security",
  },
];

export const PROFILE_SIDEBARS_ADMIN: { label: string; tab: string }[] = [
  {
    label: "Manage Torrent",
    tab: "#torrent",
  },
  {
    label: "Manage User",
    tab: "#user",
  },
  {
    label: "Configure Site",
    tab: "#site",
  },
];
