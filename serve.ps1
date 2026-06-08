$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$port = 5500
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Serving $root on http://localhost:$port/" -ForegroundColor Green

$mime = @{
  '.html' = 'text/html; charset=utf-8'
  '.css'  = 'text/css'
  '.js'   = 'application/javascript'
  '.png'  = 'image/png'
  '.jpg'  = 'image/jpeg'
  '.svg'  = 'image/svg+xml'
  '.ico'  = 'image/x-icon'
}

while ($listener.IsListening) {
  $ctx  = $listener.GetContext()
  $rel  = $ctx.Request.Url.LocalPath.TrimStart('/')
  if ($rel -eq '' -or $rel -eq '/') { $rel = 'harry-potter-trivia.html' }
  $file = Join-Path $root $rel
  if (!(Test-Path $file) -or (Test-Path $file -PathType Container)) {
    $file = Join-Path $root 'harry-potter-trivia.html'
  }
  $ext   = [IO.Path]::GetExtension($file).ToLower()
  $ctype = if ($mime.ContainsKey($ext)) { $mime[$ext] } else { 'application/octet-stream' }
  $bytes = [IO.File]::ReadAllBytes($file)
  $ctx.Response.ContentType     = $ctype
  $ctx.Response.ContentLength64 = $bytes.Length
  $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  $ctx.Response.Close()
}
