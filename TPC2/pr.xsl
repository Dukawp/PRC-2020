<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    
    version="2.0">
    
    <xsl:output method="xhtml" indent="yes" encoding="UTF-8"/>
    
    <xsl:template match="/">
        <xsl:result-document href="pr.html">
            <html>
                <head>
                    <title>Project Record</title>
                    <meta charset="UTF-8" name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                    <style>
                        ul { display:table; margin:0 auto;}
                    </style>
                </head>
                
                <body>
                    <h1 align="center">Project Record</h1> 
                   
                        <xsl:apply-templates/>
                    
                </body>
            </html>
        </xsl:result-document>
        
    </xsl:template>
    
    <xsl:template match="meta">
        <table width="100%" border="1" align="left">
            <tr>
                <td width="50%"><b>KEY NAME : </b>  <xsl:value-of select="keyname"/> </td>
                <td width="50%"><b>BEGIN DATE : </b>  <xsl:value-of select="bdate"/> </td>
            </tr>
            <tr>
                <td width="50%"><b>TITLE : </b>  <xsl:value-of select="title"/> </td>
                <td width="50%"><b>END DATE : </b>  <xsl:value-of select="edate"/> </td>
            </tr>
            <tr>
                <td width="50%"><b>SUBTITLE : </b>  <xsl:value-of select="subtitle"/> </td>
                
                <td><b>SUPERVISOR : </b><a href="{supervisor/homepage}" target="_blank"><xsl:value-of select="supervisor/name"/></a>
                    <a href="mailto:{supervisor/email}"> <i class="fa fa-envelope" style="font-size:24px;color:black"></i> </a> 
                </td>
            </tr>
        </table>
    </xsl:template>
    
    <xsl:template match="supervisor">
        
    </xsl:template>
    
    <xsl:template match="workteam">
        <table width="100%" border="1" align="left">
            <tr>
                <td><h2 align="center"><b>WorkTeam: </b></h2>
                    <xsl:apply-templates/>                
                </td>
            </tr>
        </table>
    </xsl:template>
    
    
    <xsl:template match="member">
        <li><span><xsl:value-of select="identifier"/> - <xsl:value-of select="name"/> <a href="mailto:{email}"> <i class="fa fa-envelope" style="font-size:16px;color:black"></i> </a>
        </span>
            <p>
             <img width="15%">
                 <xsl:attribute name="src">
                     <xsl:value-of select="photo/@path"/>
                 </xsl:attribute>
             </img>
            </p>
        </li>
    </xsl:template>
    
    <xsl:template match="abstract">
        <h2 align="center"><b>Abstract: </b></h2>
            <xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="p">
        <p align="center">
            <xsl:apply-templates/>
        </p>
    </xsl:template>
    
    <xsl:template match="b">
        <b> <xsl:value-of select="."/> </b>
    </xsl:template>
    
    
    <xsl:template match="i">
        <i> <xsl:value-of select="."/> </i>
    </xsl:template>
    
    
    <xsl:template match="u">
        <u> <xsl:value-of select="."/> </u>
    </xsl:template>
    
    
    <xsl:template match="xref">
        <a target="_blank">
            <xsl:attribute name="href">
                <xsl:value-of select="@url"/>
            </xsl:attribute>
            <xsl:value-of select="@url"/>
        </a>
    </xsl:template>
    

    
    <xsl:template match="deliverables">
        <h2 align="center"><b>Deliverables: </b></h2>
        <ul>
            <xsl:apply-templates/>
        </ul>
        
    </xsl:template>
    
    <xsl:template match="deliverable">
        <li align="center">
            <a target="_blank">
                  <xsl:attribute name="href">
                      <xsl:value-of select="@path"/>
                  </xsl:attribute>
                    <xsl:value-of select="."/>
                </a>
        </li>
    </xsl:template>
    
    
    
</xsl:stylesheet>