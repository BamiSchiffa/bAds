const express = require('express');
const router = express.Router();

const db = require('../../database')
const axios = require('axios')

const passport = require('passport');
const discordStrategy = require('passport-discord').Strategy;

router.use(passport.initialize());
router.use(passport.session());

passport.use(new discordStrategy({
    clientID: '872487141597380658',
    clientSecret: 'W7nFhKhRqquC8RAWQJVB8W6fw0TAZAhr',
    callbackURL: 'http://localhost:3003/auth/discord/callback',
    scope: [
        "identify",
        "guilds",
        "guilds.join"
    ]
}, (accessToken, refreshToken, profile, done) => {
    let client = require('../../bot').bot;
    const guild = client.guilds.cache.get('872486982226440203')
    let member = guild.members.cache.get(profile.id)
    if (!member) return;
    if (db.quick.getVerified(profile)) {
        member.send('Je bent al getVerifieerd!');
    } else {
        db.quick.setVerified(profile, true)
        member.roles.add('872563632611922004');
        member.send('Succesfully verified!')
        db.users.add(profile.id, accessToken);   
    }
    let oauth = require('../../bot').oauth;

    profilePicture = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
    return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

router.get("/auth/discord", passport.authenticate("discord"))
router.get("/auth/discord/callback", (req, res, next) => {
    passport.authenticate('discord', {
        session: true,
        failureRedirect: "/auth/discord",
        successRedirect: "/succes"
    }, function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/auth/discord');
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.redirect("/dashboard");
        });
    })(req, res, next);
})

router.get("/auth/login", (req, res, next) => {
    res.status(200);
    res.redirect("/auth/discord")
    return next();
});

router.get("/auth/logout", (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.redirect(302, "/auth/login");
        return next();
    } else {
        req.logout();
        res.redirect(302, "/auth/login")
        return next();
    }
})

router.get('/succes', (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.redirect(302, "/auth/login");
        return next();
    }

    res.render('succes.ejs', {

    })
})

module.exports = router;