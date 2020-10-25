export interface Image {
  id: number;
  url: string;
}

export interface Orphanage {
  id: number;
  name: string;
  about: string;
  instructions: string;
  latitude: number;
  longitude: number;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Image[];
}

export interface HeaderProps {
  title: string;
  showCancel?: boolean;
  indexPage?: number;
}

export interface OrphanageDetailParams {
  id: number;
}

export interface OrphanageDataParams {
  latitude: number;
  longitude: number;
}

export interface NotificationModalProps {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
}
