import type { APIRoute } from 'astro';
import { linkedinQrSvg } from '../lib/qr';

// Downloadable copy of the QR code, for print or slides: /qr-linkedin.svg
export const GET: APIRoute = async () =>
	new Response(await linkedinQrSvg(), { headers: { 'Content-Type': 'image/svg+xml' } });
