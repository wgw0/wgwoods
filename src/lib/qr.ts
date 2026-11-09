import QRCode from 'qrcode';
import { SITE_URL_LINKEDIN_SHORT } from '../consts';

// The QR code points at our own short link (see public/_redirects), not straight at LinkedIn,
// so printed codes keep working even if the LinkedIn address ever changes.
export async function linkedinQrSvg(): Promise<string> {
	return QRCode.toString(SITE_URL_LINKEDIN_SHORT, {
		type: 'svg',
		errorCorrectionLevel: 'Q',
		margin: 2,
		color: { dark: '#0f172a', light: '#ffffff' },
	});
}
