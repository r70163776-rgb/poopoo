// اصل میں یہ ہوگا:
monetag.showAd('rewarded-interstitial', {
    onReward: function() {
        // Monetag آپ کے اکاؤنٹ میں پیسے جمع کرے گا
        // صارف کو انعام ملے گا
        continueGame();
    },
    onClose: function() {
        // ادائیگی ہو چکی ہوگی
    }
});

// آپ کے Monetag ڈیش بورڈ پر:
// - امپریشنز بڑھیں گے
// - CPM کے حساب سے آمدنی ہوگی
// - روزانہ، ہفتہ وار رپورٹس ملیں گی
