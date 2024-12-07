const nodemailer = require("nodemailer");
const express = require("express");

const sender = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "changdervishal1999.official@gmail.com",
    pass: "himo oqxu tnhp zsmw",
  },
});

const sendEmail = async (to, subject, text) => {
  console.log("Ran");
  try {
    await sender.sendMail({
      from: "changdervishal1999.official@gmail.com",
      to,
      subject,
      text,
    });
    console.log("Sent suceessfully");
  } catch (err) {
    console.error("Mail Unsuccessfull", err.message);
  }
};

module.exports = { sendEmail };
