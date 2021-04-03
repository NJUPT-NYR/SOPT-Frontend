export enum AUTH_ROLES {
  USER,
}

export const COOKIE_NAME_JWT_TOKEN = "JWT_TOKEN";

export const PROFILE_SIADBARS: { label: string; path: string }[] = [
  {
    label: "User Info",
    path: "/profile/userinfo",
  },
  {
    label: "Send Invitation",
    path: "/profile/sendInvitation",
  },
];

export const PROFILE_SIADBARS_ADMIN: { label: string; path: string }[] = [
  {
    label: "Manage Torrent",
    path: "#torrent",
    // path: "/profile/admin/torrent",
  },
  {
    label: "Manage User",
    path: "#user",
    // path: "/profile/admin/user",
  },
  {
    label: "Configure Site",
    path: "#site",
    // path: "/profile/admin/site",
  },
];
