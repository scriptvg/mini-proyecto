// src/mui-license.js
import { LicenseInfo } from '@mui/x-license-pro';

const licenseKey = import.meta.env.VITE_MUI_LICENSE_KEY;

LicenseInfo.setLicenseKey(licenseKey);
