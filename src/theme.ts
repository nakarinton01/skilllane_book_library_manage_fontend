import  type { ThemeConfig } from 'antd';

const theme: ThemeConfig = {
  token: {
    colorPrimary: '#00A2DD',
    colorSuccess: '#52C41A',
    colorWarning: '#FAAD14',
    colorError: '#FF4D4F',
    colorBgBase: '#ffffff',
    'blue-1': '#0081b8',
    'blue-2': '#26bdeb',
    'blue-3': '#e6fcff',
  },
  components: {
    Table: {
      colorPrimaryBg: '#000000',
      borderRadiusLG: 0,
    },
    Menu: {
      colorItemBgSelected: '#00a2dd',
      colorItemTextHover: '#26bdeb',
      colorItemTextSelected: '#ffffff',
    },
    Button: {
      borderRadius: 5,
      borderRadiusLG: 5,
      borderRadiusSM: 5,
      borderRadiusXS: 5,
      colorLink: '#00A2DD',
    },
    Input: {
      borderRadius: 0,
    },
    Pagination: {
      borderRadius: 0,
    },
    Select: {
      borderRadius: 0,
    },
    DatePicker: {
      borderRadius: 0,
    },
    Typography: {
      lineHeight: 0,
    },
    Upload: {
      borderRadiusLG: 0,
    },
    Switch: {
      colorPrimary: '#000000',
      colorPrimaryHover: '#8d8d8d',
    },
  },
};

export const colors = {
  black: '#1f1f1f',
};

export default theme;
