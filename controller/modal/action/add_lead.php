<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
date_default_timezone_set('Asia/Manila');
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

include('../connection/connection.php');

	if (isset($_POST['add']))
		{
            $pid = mysqli_real_escape_string($conn, $_POST['mypid']);
            $fid = mysqli_real_escape_string($conn, $_POST['fid']); 

            $query 		= mysqli_query($conn, "SELECT * FROM faculty WHERE fid = '$fid'");
			$row		= mysqli_fetch_array($query);
			$num_row 	= mysqli_num_rows($query);
 
	if ($num_row > 0){		

            

        $email = $row['email'];
        $insert_information = mysqli_query($conn, "INSERT INTO assign_program_faculty (fid,pid) VALUES  ('$fid','$pid')");
        $xrow=mysqli_fetch_array($insert_information);
            
					  require 'mailler/autoload.php';
    
                      $subject = 'CICC | PROGRAM LEAD INVITATION '.strtoupper($email).' ';
 
  
                            $message = '
                        <!DOCTYPE html>
                        <html lang="en" >
                        <head>
                        <meta charset="UTF-8">
                        <title>CICC | PROGRAM LEAD INVITATION</title>
                        

                        </head>
                        <body>
                        <!-- partial:index.partial.html -->
                        <!doctype html>
                        <html>

                        <head>
                        <meta name="viewport" content="width=device-width" />
                        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                        <title>CICC | PROGRAM LEAD INVITATION</title>
                        <style>
                            /* -------------------------------------
                                GLOBAL RESETS
                            ------------------------------------- */

                            /*All the styling goes here*/

                            img {
                            border: none;
                            -ms-interpolation-mode: bicubic;
                            max-width: 100%;
                            }

                            body {
                            background-color: #f2f2f7;
                            font-family: sans-serif;
                            -webkit-font-smoothing: antialiased;
                            font-size: 15px;
                            line-height: 1.4;
                            margin: 0;
                            padding: 0;
                            -ms-text-size-adjust: 100%;
                            -webkit-text-size-adjust: 100%;
                            }

                            table {
                            border-collapse: separate;
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            width: 100%;
                            }

                            table td {
                            font-family: sans-serif;
                            font-size: 15px;
                            vertical-align: top;
                            }

                            /* -------------------------------------
                                BODY & CONTAINER
                            ------------------------------------- */

                            .body {
                            background-color: #f2f2f7;
                            width: 100%;
                            }

                            /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */

                            .container {
                            display: block;
                            margin: 0 auto !important;
                            /* makes it centered */
                            max-width: 580px;
                            padding: 10px;
                            width: 580px;
                            }

                            /* This should also be a block element, so that it will fill 100% of the .container */

                            .content {
                            box-sizing: border-box;
                            display: block;
                            margin: 0 auto;
                            max-width: 580px;
                            padding: 10px;
                            }

                            /* -------------------------------------
                                HEADER, FOOTER, MAIN
                            ------------------------------------- */

                            .main {
                            background: #ffffff;
                            border-radius: 3px;
                            width: 100%;
                            }

                            .wrapper {
                            box-sizing: border-box;
                            padding: 20px;
                            }

                            .content-block {
                            padding-bottom: 10px;
                            padding-top: 10px;
                            }

                            .footer {
                            clear: both;
                            margin-top: 10px;
                            text-align: center;
                            width: 100%;
                            }

                            .footer td,
                            .footer p,
                            .footer span,
                            .footer a {
                            color: #8e8e93;
                            font-size: 12px;
                            text-align: center;
                            }

                            /* -------------------------------------
                                TYPOGRAPHY
                            ------------------------------------- */

                            h1,
                            h2,
                            h3,
                            h4 {
                            color: #1c1c1e;
                            font-family: sans-serif;
                            font-weight: 400;
                            line-height: 1.5;
                            margin: 0;
                            margin-bottom: 30px;
                            }

                            h1 {
                            font-size: 35px;
                            font-weight: 300;
                            text-align: center;
                            text-transform: capitalize;
                            }

                            p,
                            ul,
                            ol {
                            color: #1c1c1e;
                            font-family: sans-serif;
                            font-size: 15px;
                            font-weight: normal;
                            margin: 0;
                            margin-bottom: 15px;
                            }

                            p li,
                            ul li,
                            ol li {
                            list-style-position: inside;
                            margin-left: 5px;
                            }

                            a {
                            color: #007aff;
                            text-decoration: underline;
                            }

                            /* -------------------------------------
                                BUTTONS
                            ------------------------------------- */

                            .btn {
                            box-sizing: border-box;
                            width: 100%;
                            }

                            .btn>tbody>tr>td {
                            padding-bottom: 15px;
                            }

                            .btn table {
                            width: auto;
                            }

                            .btn table td {
                            background-color: #ffffff;
                            border-radius: 5px;
                            text-align: center;
                            }

                            .btn a {
                            background-color: #ffffff;
                            border: solid 1px #007aff;
                            border-radius: 5px;
                            box-sizing: border-box;
                            color: #007aff;
                            cursor: pointer;
                            display: inline-block;
                            font-size: 15px;
                            font-weight: bold;
                            margin: 0;
                            padding: 12px 25px;
                            text-decoration: none;
                            text-transform: capitalize;
                            }

                            .btn-primary table td {
                            background-color: #007aff;
                            }

                            .btn-primary a {
                            background-color: #007aff;
                            border-color: #007aff;
                            color: #ffffff;
                            }

                            /* -------------------------------------
                                OTHER STYLES THAT MIGHT BE USEFUL
                            ------------------------------------- */

                            .last {
                            margin-bottom: 0;
                            }

                            .first {
                            margin-top: 0;
                            }

                            .align-center {
                            text-align: center;
                            }

                            .align-right {
                            text-align: right;
                            }

                            .align-left {
                            text-align: left;
                            }

                            .clear {
                            clear: both;
                            }

                            .mt0 {
                            margin-top: 0;
                            }

                            .mb0 {
                            margin-bottom: 0;
                            }

                            .preheader {
                            color: transparent;
                            display: none;
                            height: 0;
                            max-height: 0;
                            max-width: 0;
                            opacity: 0;
                            overflow: hidden;
                            mso-hide: all;
                            visibility: hidden;
                            width: 0;
                            }

                            .powered-by a {
                            text-decoration: none;
                            }

                            hr {
                            border: 0;
                            border-bottom: 1px solid #f2f2f7;
                            margin: 20px 0;
                            }

                            /* -------------------------------------
                                RESPONSIVE AND MOBILE FRIENDLY STYLES
                            ------------------------------------- */

                            @media only screen and (max-width: 620px) {
                            table[class=body] h1 {
                                font-size: 28px !important;
                                margin-bottom: 10px !important;
                            }
                            table[class=body] p,
                            table[class=body] ul,
                            table[class=body] ol,
                            table[class=body] td,
                            table[class=body] span,
                            table[class=body] a {
                                font-size: 16px !important;
                            }
                            table[class=body] .wrapper,
                            table[class=body] .article {
                                padding: 10px !important;
                            }
                            table[class=body] .content {
                                padding: 0 !important;
                            }
                            table[class=body] .container {
                                padding: 0 !important;
                                width: 100% !important;
                            }
                            table[class=body] .main {
                                border-left-width: 0 !important;
                                border-radius: 0 !important;
                                border-right-width: 0 !important;
                            }
                            table[class=body] .btn table {
                                width: 100% !important;
                            }
                            table[class=body] .btn a {
                                width: 100% !important;
                            }
                            table[class=body] .img-responsive {
                                height: auto !important;
                                max-width: 100% !important;
                                width: auto !important;
                            }
                            }

                            /* -------------------------------------
                                PRESERVE THESE STYLES IN THE HEAD
                            ------------------------------------- */

                            @media all {
                            .ExternalClass {
                                width: 100%;
                            }
                            .ExternalClass,
                            .ExternalClass p,
                            .ExternalClass span,
                            .ExternalClass font,
                            .ExternalClass td,
                            .ExternalClass div {
                                line-height: 100%;
                            }
                            .apple-link a {
                                color: inherit !important;
                                font-family: inherit !important;
                                font-size: inherit !important;
                                font-weight: inherit !important;
                                line-height: inherit !important;
                                text-decoration: none !important;
                            }
                            .btn-primary table td:hover {
                                background-color: #8e8e93 !important;
                            }
                            .btn-primary a:hover {
                                background-color: #8e8e93 !important;
                                border-color: #8e8e93 !important;
                            }
                            }
                        </style>
                        </head>

                        <body class="">
                        <span class="preheader">This is preheader text. Some clients will show this text as a preview.</span>
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
                            <tr>
                            <td>&nbsp;</td>
                            <td class="container">
                                <div class="content">

                                <!-- START CENTERED WHITE CONTAINER -->
                                <table role="presentation" class="main">

                                    <!-- START MAIN CONTENT AREA -->


                                    <tr>
                                    <td class="wrapper">
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td>
                                            <center></center>
                                            <br>
                                            <br>
                                            <p>Hi! '.strtoupper($email).',</p>
                                            <p>WELCOME CICC</p><br>
                                            <p><h5><b>YOU HAVE BEEN INVITED TO LEAD A PROGRAM</b></h5></p><br>
                                        
                                        
                                            <p>Have a safe and blessed week ahead and thank you.</p>
                                            <p>Best Regards,</p>
                                            <p>CICC</p>
                                            </td>
                                        </tr>
                                        </table>
                                    </td>
                                    </tr>

                                    <!-- END MAIN CONTENT AREA -->
                                </table>
                                <!-- END CENTERED WHITE CONTAINER -->

                                <!-- START FOOTER -->
                                <div class="footer">
                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td class="content-block">
                                        <span class="apple-link">CICC ADDRESS : </span>
                                        <a href="#"></a>.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="content-block powered-by">
                                        Powered by <a href="#"">CICC</a>.
                                        </td>
                                    </tr>
                                    </table>
                                </div>
                                <!-- END FOOTER -->

                                </div>
                            </td>
                            <td>&nbsp;</td>
                            </tr>
                        </table>
                        </body>

                        </html>

                        
                        </body>
                        </html>';

   
    //Load composer's autoloader

        $mail = new PHPMailer(true);                            
        try {
            //Server settings
            $mail->isSMTP();                                     
            $mail->Host = 'smtp-mail.outlook.com';                      
            $mail->SMTPAuth = true;                             
            $mail->Username = 'gmfacistol@outlook.com';     
            $mail->Password = '@Light101213';             
            // $mail->SMTPOptions = array(
            //     'ssl' => array(
            //     'verify_peer' => false,
            //     'verify_peer_name' => false,
            //     'allow_self_signed' => true
            //     )
            // );                         
            $mail->SMTPSecure = 'tls';                           
            $mail->Port = 587;                                   

            //Send Email
            $mail->setFrom('gmfacistol@outlook.com');
            
            //Recipients
            $mail->addAddress($email);              
            $mail->addReplyTo('gmfacistol@outlook.com');
            
            //Content
            $mail->isHTML(true);                                  
            $mail->Subject = $subject;
            $mail->Body    = $message;

            $mail->send();
        
        $_SESSION['result'] = 'Message has been sent';
        $_SESSION['status'] = 'ok';
        } catch (Exception $e) {
        $_SESSION['result'] = 'Message could not be sent. Mailer Error: '.$mail->ErrorInfo;
        $_SESSION['status'] = 'error';
        }

        header('location: ../../programs.php');	


    }else{
        header('location: ../../programs.php');	
        	
     
     }

        
}
       





	
  ?>