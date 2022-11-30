import { NextResponse } from 'next/server'

export async function middleware(request) {
    let response = NextResponse.next()
    const user = request.cookies.get('user');
    if (!user) {
        const url = request.nextUrl.clone()
        url.pathname = '/auth/login'
        return NextResponse.redirect(url)
    }


    return response

}
// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/dashboard/:path*', '/pos/:path*'],
}