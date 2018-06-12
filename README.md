# PantryPatron #

<!-- 
> This material was originally posted [here](http://www.quora.com/What-is-Amazons-approach-to-product-development-and-product-management). It is reproduced here for posterities sake.

There is an approach called "working backwards" that is widely used at Amazon. They work backwards from the customer, rather than starting with an idea for a product and trying to bolt customers onto it. While working backwards can be applied to any specific product decision, using this approach is especially important when developing new products or features.

For new initiatives a product manager typically starts by writing an internal press release announcing the finished product. The target audience for the press release is the new/updated product's customers, which can be retail customers or internal users of a tool or technology. Internal press releases are centered around the customer problem, how current solutions (internal or external) fail, and how the new product will blow away existing solutions.

If the benefits listed don't sound very interesting or exciting to customers, then perhaps they're not (and shouldn't be built). Instead, the product manager should keep iterating on the press release until they've come up with benefits that actually sound like benefits. Iterating on a press release is a lot less expensive than iterating on the product itself (and quicker!).

If the press release is more than a page and a half, it is probably too long. Keep it simple. 3-4 sentences for most paragraphs. Cut out the fat. Don't make it into a spec. You can accompany the press release with a FAQ that answers all of the other business or execution questions so the press release can stay focused on what the customer gets. My rule of thumb is that if the press release is hard to write, then the product is probably going to suck. Keep working at it until the outline for each paragraph flows. 

Oh, and I also like to write press-releases in what I call "Oprah-speak" for mainstream consumer products. Imagine you're sitting on Oprah's couch and have just explained the product to her, and then you listen as she explains it to her audience. That's "Oprah-speak", not "Geek-speak".

Once the project moves into development, the press release can be used as a touchstone; a guiding light. The product team can ask themselves, "Are we building what is in the press release?" If they find they're spending time building things that aren't in the press release (overbuilding), they need to ask themselves why. This keeps product development focused on achieving the customer benefits and not building extraneous stuff that takes longer to build, takes resources to maintain, and doesn't provide real customer benefit (at least not enough to warrant inclusion in the press release).
 -->
 
## Heading ##
  > Ever go grocery shopping and wonder. How much money have I spent so far? Well worry no longer PantryPatron can help with just that! Login, create a grocery list in advanced, then when you get to the grocery store go down the list and enter the price. We will take care of the rest. Before you get to the register you will know how much you owe before taxes.

## Sub-Heading ##
  > This app is for people who just want to keep track of how much money they are spending as they shop. We make the accidental clearing of the calculator a thing of the past. Just don't delete the list.

## Summary ##
  > PantryPatron is intended for people who are fed up with getting to the cash register after a grocery run and thinking, how the hell did I go over my budget by $50! Happens all the time. Add items before you go to the store then right before you begin enter the prices and quatities you buy and we do the math for you. 
  
## Problem ##
  > Have you ever tried to use calculator while grocery shopping? The banana's weight 2.75 pounds and it's $0.34 a pound. I don't got time for that.

## Solution ##
  > Never worry about working those complicated calulators again. Give me how much you bought and how much it cost and we are good.
## Quote from You ##
  > "Let us do the math for you"

## How to Get Started ##
  > 1. create an account
  > 2. log in
  > 3. create a list
  > 4. enter item information

## Customer Quote ##
  > "Damn girl, now I don't have to figure out how to multiply prices vs pounds and risk loosing my history." 

## Closing and Call to Action ##
  > Our software is pretty easy to use. Play around with and see like it before continuing.

## Server Endpoints ## 
> GET /   -- takes you to home page 

> POST /login  -- takes in a username and password in the form of {username: <username> , password: <password> } if the user exists, it creates a session and returns the user's information, location for redirection and grocery lists the user has made.
 
> POST /updateHistory -- takes in an item id at the least. We pass it an updated item history object in order to find and update any record in the database. This endpoint returns the updated database document. 

> GET /logout  -- destroys the session then redirects to login 

> POST /register -- creates a new user account and redirects to login 

> POST /search/item -- only really requires and item name. Returns an item document from the database

> POST /addItem -- given a item document from the database this endpoint creates an item history and returns a grocerylist with the new item added onto it.

> POST /lists/create - used to create a list  

> POST /updateList -- used to update a list 

> POST /lists/delete --  used to delete a list 

> GET /store/search -- return all store documents from the database

> POST /store/create -- creates a new store document for the database 

> pOST /search/users -- searches the database to check if a username exists or not 
