<%@ Page Title="Home" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="home.aspx.cs" Inherits="DmitryDVD_Winter14.home" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <h1>Home page</h1>

    <h2>Please browse the list of DVD’s: </h2>

    <asp:DataList ID="DVDDataList" runat="server" OnItemCommand="DVDDataList_ItemCommand">
        <ItemTemplate>
            <div class="repRow">
                <div class="repImg">
                    <img class="dvdimg" src='<%#Eval("DVDimg")%>' />
                </div>
                <div class="repText">
                    <span>Title:</span> <%#Eval("DVDtitle") %><br />
                    <span>Artist:</span><%#Eval("DVDartist") %><br /><span>Rating:</span><%#Eval("DVDrating") %><br /><span>Price: </span><span class="repPrice"><%#Eval("DVDprice") %></span><br />
                    <span><asp:LinkButton ID="DetailsButton" runat="server"
                            Text="Details"
                            CommandName="details"
                            CommandArgument='<%# Eval("DVDID")%>' /></span>
                    <span><asp:LinkButton ID="BuyButton" runat="server"
                            Text="Buy DVD"
                            CommandName="buyit"
                            CommandArgument='<%# Eval("DVDID")%>' /></span>
                </div>
            </div>




        </ItemTemplate>
        <SeparatorTemplate>
            <hr />
        </SeparatorTemplate>

    </asp:DataList>

    <br />
    <br />
    <br />


</asp:Content>
