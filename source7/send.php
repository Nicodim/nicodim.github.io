<?php
//  showing errors on your page to see what the fatal PHP error is
ini_set('display_errors', 1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP; 
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';
// require 'phpmailer/phpmailer.lang-he.php';
// Instantiation and passing `true` enables exceptions
$mail = new PHPMailer(true);

// Переменные, которые отправляет пользователь
$name = $_POST['name'];
$email = $_POST['email'];
$text = $_POST['text'];
$phone = $_POST['phone'];
$shape_input = $_POST['shape-input'];
$size_input = $_POST['size-input'];
$tp_input = $_POST['tp-input'];
$img_canvas = $_POST['img-canvas'];
// the function converts all the characters that the user tries to add to the form
$name = htmlspecialchars($name);
$email = htmlspecialchars($email);
$text = htmlspecialchars($text);
$phone = htmlspecialchars($phone);
$shape_input = htmlspecialchars($shape_input);
$size_input = htmlspecialchars($size_input);
$tp_input = htmlspecialchars($tp_input);
$img_canvas = htmlspecialchars($img_canvas);
// decodes the url if the user tries to add it to the form.
$name = urldecode($name);
$email = urldecode($email);
$text = urldecode($text);
$phone = urldecode($phone);
$shape_input = urldecode($shape_input);
$size_input = urldecode($size_input);
$tp_input = urldecode($tp_input);
$img_canvas = urldecode($img_canvas);
// remove spaces from the beginning and end of the line
$name = trim($name);
$email = trim($email);
$text = trim($text); 
$phone = trim($phone); 
$shape_input = trim($shape_input);
$size_input = trim($size_input);
$tp_input = trim($tp_input);
$img_canvas = trim($img_canvas);



$temp_file = tempnam(sys_get_temp_dir(), 'foo');
$img_canvas = $_POST['img-canvas'];
$img_canvas = str_replace('data:image/png;base64,', '', $img_canvas);
$img_canvas = str_replace(' ', '+', $img_canvas);
$data = base64_decode($img_canvas);
$file = $temp_file . uniqid() . '.png';
$success = file_put_contents($file, $data);


if(isset($_FILES['image'])){
    $errors= array();
    $file_name = $_FILES['image']['name'];
    $file_size = $_FILES['image']['size'];
    $file_tmp = $_FILES['image']['tmp_name'];
    $file_type = $_FILES['image']['type'];
    $file_ext=strtolower(end(explode('.',$_FILES['image']['name'])));
    
    $expensions= array("jpeg","jpg","png","pdf");
    
    if(in_array($file_ext,$expensions)=== false) {
       $errors[]="extension not allowed, please choose a PDF, JPEG or PNG file.";
    }
    
    if($file_size > 2097152) {
       $errors[]='File size must be excately 2 MB';
    }
    
    if(empty($errors)==true) {
       move_uploaded_file($file_tmp, $file); //The folder where you would like your file to be saved
       echo "Success";
    }else{
       print_r($errors);
    }
 }

try { 
    $mail->isSMTP();     
    $mail->CharSet = 'utf-8';
    $mail->SetLanguage("he");
    // Настройки вашей почты
    $mail->Host       = 'mail.webstickprojects.co.il';                    // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'nicky@webstickprojects.co.il';                     // SMTP username
    $mail->Password   = 'Q[07}e#iH9DX';                               // SMTP password
    $mail->SMTPSecure = 'ssl';         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
    $mail->Port       = 465;
    $mail->addAttachment($file);
    $mail->setFrom('info@shokoladsheli.co.il'); // Адрес самой почты

    // Получатель письма
    $mail->addAddress('myshokotlv@gmail.com'); 
   //  $mail->addAddress('nickwebstick@gmail.com'); // Ещё один, если нужен
 
$mail->isHTML(true);                                  // Set email format to HTML
$mail->Subject = 'הזמנה חדשה';
$mail->Body  ='<div dir="rtl">'.$name. '<br>טלפון: ' .$phone. '<br>מייל: ' .$email. '<br>תגובה: ' .$text. '<br>טופס: ' .$shape_input. '<br>גודל: ' .$size_input. '<br>תוספות: ' .$tp_input.'</div>';                   


$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

$mail->send();
echo file_get_contents("https://nick.webstickprojects.co.il/shokoladsheli/thank-you.php");
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
?>

