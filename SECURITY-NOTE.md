# Security Note - Development Environment

## 🔒 Current Setup

For **development and testing purposes**, WordPress credentials are stored as client-accessible environment variables with the `NEXT_PUBLIC_` prefix. This allows the Content Manager to work directly from the browser.

**Current Environment Variables:**
- `NEXT_PUBLIC_WORDPRESS_URL`
- `NEXT_PUBLIC_WORDPRESS_USERNAME` 
- `NEXT_PUBLIC_WORDPRESS_PASSWORD`

## ⚠️ Security Considerations

**This setup is ONLY suitable for development/testing** because:

1. **Client-side exposure** - Credentials are visible in browser dev tools
2. **Source code exposure** - Credentials could be accidentally committed
3. **Network exposure** - Credentials are sent with every request

## 🛡️ Production Recommendations

For **production deployment**, implement one of these approaches:

### Option 1: Server-Side API Routes
```typescript
// app/api/wordpress/route.ts
export async function POST(request: Request) {
  const { action, data } = await request.json();
  
  // Use server-side environment variables (without NEXT_PUBLIC_)
  const wordpress = new WordPressAPI({
    baseUrl: process.env.WORDPRESS_URL,
    username: process.env.WORDPRESS_USERNAME,
    password: process.env.WORDPRESS_PASSWORD
  });
  
  // Handle WordPress operations server-side
  return Response.json(await wordpress[action](data));
}
```

### Option 2: WooCommerce API Keys
```typescript
// Use API keys instead of username/password
const wordpress = new WordPressAPI({
  baseUrl: process.env.NEXT_PUBLIC_WORDPRESS_URL,
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET
});
```

### Option 3: JWT Authentication
```typescript
// Implement JWT-based authentication
const token = await getJWTToken();
const wordpress = new WordPressAPI({
  baseUrl: process.env.NEXT_PUBLIC_WORDPRESS_URL,
  token: token
});
```

## 🔄 Current Status

- ✅ **Development**: Working with direct credentials
- ❌ **Production**: Requires security improvements
- 🎯 **Recommended**: Implement server-side API routes

## 📋 Next Steps for Production

1. **Remove** `NEXT_PUBLIC_` prefix from sensitive credentials
2. **Implement** server-side API routes for WordPress operations
3. **Use** proper authentication methods (API keys, JWT, etc.)
4. **Audit** all environment variables before deployment

---

**Remember**: Never commit real credentials to version control, even in development!
