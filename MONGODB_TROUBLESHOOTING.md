# MongoDB Connection Troubleshooting Guide

## Error: `querySrv ETIMEOUT`

This error occurs when your application cannot connect to MongoDB Atlas due to network/firewall restrictions.

---

## ✅ Solution Steps

### 1. **Add Your IP to MongoDB Atlas Whitelist** (Most Common Fix)

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Select your project
3. Click **Network Access** (left sidebar under "Security")
4. Click **IP Access List** tab
5. Click **Add IP Address**
6. Choose one:
   - **Development**: Click "Add Current IP Address"
   - **Testing**: Enter `0.0.0.0/0` (allows all IPs - NOT for production!)
   - **Manual**: Enter your specific IP address
7. Click **Confirm**

⚠️ **Note**: If you're on a dynamic IP (most home networks), you may need to update this periodically.

---

### 2. **Check Your Internet Connection**

- Ensure you have a stable internet connection
- Try accessing other websites to verify connectivity
- If on a corporate network, check if MongoDB ports are blocked

---

### 3. **Verify Firewall Settings**

MongoDB Atlas uses port **27017** (and DNS SRV records). Some networks/firewalls block this:

- **Windows Firewall**: Ensure Node.js/your app can make outbound connections
- **Corporate Networks**: May block MongoDB connections - contact IT
- **VPN**: Try connecting with/without VPN

---

### 4. **Check MongoDB Atlas Cluster Status**

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Verify your cluster is **running** (not paused)
3. Check the cluster's region - ensure it's accessible from your location

---

### 5. **Verify Connection String**

Your connection string should look like:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/database_name?retryWrites=true&w=majority
```

**Important**:
- Include the database name: `/database_name` before the `?`
- Special characters in password must be URL-encoded
- No spaces in the connection string

---

## 🧪 Testing Your Connection

Run the diagnostic script:

```bash
node scripts/testMongoConnection.js
```

This will:
- ✅ Test the connection
- ✅ Show detailed error messages
- ✅ Provide specific troubleshooting steps

---

## 🔧 Configuration Updates Made

### 1. **Updated `app/libs/db.js`**

Added timeout configurations:
- `serverSelectionTimeoutMS: 10000` - Fail faster (10s instead of 30s)
- `socketTimeoutMS: 45000` - Close inactive sockets after 45s
- `connectTimeoutMS: 10000` - Initial connection timeout
- Better error logging

### 2. **Updated `.env.local`**

Fixed the MongoDB URI to include the database name:
```
mongodb+srv://user:pass@cluster.mongodb.net/database_name?options
```

---

## 📝 Common Issues & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| `ETIMEOUT` | IP not whitelisted | Add IP to Atlas whitelist |
| `ENOTFOUND` | Invalid hostname | Check cluster URL |
| `Authentication failed` | Wrong credentials | Verify username/password |
| `Network unreachable` | Firewall/VPN | Check network settings |

---

## 🚀 Production Considerations

For production deployments:

1. **Never use `0.0.0.0/0`** - Only whitelist specific IPs
2. **Use environment-specific credentials** - Different for dev/staging/prod
3. **Enable MongoDB Atlas monitoring** - Set up alerts
4. **Use connection pooling** - Already configured in `db.js`
5. **Implement retry logic** - For transient failures

---

## 📞 Need More Help?

- MongoDB Atlas Support: https://www.mongodb.com/cloud/atlas/support
- MongoDB Community Forums: https://www.mongodb.com/community/forums/
- Check MongoDB Atlas Status: https://status.cloud.mongodb.com/

---

**Last Updated**: 2026-02-11
