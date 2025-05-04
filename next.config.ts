import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: '217.114.11.158',
				port: '9000',
				pathname: '/avatars/**',
			},
		],
	},
}

export default nextConfig
